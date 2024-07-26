import { availableLanguages } from "@/lib/available-languages";
import { OutputSchema } from "@/lib/image.types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("image_url") as string;
  const language = request.nextUrl.searchParams.get("language") as string;
  const apiKey = request.headers.get("X-OpenAI-ApiKey");
  if (!apiKey)
    return NextResponse.json(
      { error: "Header X-OpenAI-ApiKey not found" },
      { status: 400 }
    );
  if (!imageUrl)
    return NextResponse.json(
      { error: "image url must be specified" },
      { status: 400 }
    );
  if (!imageUrl || !availableLanguages.includes(language))
    return NextResponse.json(
      { error: `must specified language (${availableLanguages})` },
      { status: 400 }
    );
  const openai = createOpenAI({
    apiKey,
  });
  const { object } = await generateObject({
    model: openai("gpt-4-turbo"),
    schema: OutputSchema,
    messages: [
      {
        role: "system",
        content: `Eres una IA experta el leer imágenes dada su UR. Para cada imagen quiero que me proporciones un caption de lo que ves en unas 20 palabras, que sea detallado, conciso y corto con un máximo de 20 palabras. Además la paleta de entre 1 a 5 colores primarios de la imagen que ha de estar en formato hexadecimal. Así como una description muy detallada de la imagen. Todo el texto que proporciones debe estrictamente estar en el siguiente lenguaje: ${language} `,
      },
      { role: "user", content: [{ type: "image", image: new URL(imageUrl) }] },
    ],
  });

  return NextResponse.json(object);
}
