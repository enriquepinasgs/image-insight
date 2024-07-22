# ImageInsight: Intelligent Image Analysis API

ImageInsight is a versatile API designed to effortlessly extract essential information from images. Using vercel ai sdk, AI analyze the provided image URL to generate a detailed caption, a comprehensive description, and identify the primary color palette. Users can choose to receive the output in either English or Spanish, making it an ideal solution for developers looking to integrate robust image analysis capabilities into their applications.

## Features

- **Image Caption**: Generate a descriptive caption for the image.
- **Image Description**: Generate a comprehensive description.
- **Primary Color Palette**: Extract the main colors from the image.
- **Multilingual Support**: Choose to receive the output in English or Spanish.

## Endpoint

### `GET /api/analyze-image`

Analyze an image by providing its URL and get back essential insights.

#### Request

**URL**: `/api/analyze-image`

**Method**: `GET`

**Content-Type**: `application/json`

**Headers**:

- `X-OpenAI-ApiKey` (string, required): Your OpenAI ApiKey.

**Body Parameters**:

- `imageUrl` (string, required): The URL of the image to be analyzed.
- `language` (string, required): The language for the output. Possible values are `english` and `spanish`.

**Example Request**:

```json
{
  "imageUrl": "https://images.unsplash.com/photo-1721406769891-f2ba651401d9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "language": "spanish"
}
```

#### Response

**Content-Type**: application/json

**Body Parameters**:

- mainColors (array): An array of hex color codes representing the primary colors in the image.
- caption (string): A descriptive caption for the image.
- description (string): A comprehensive description of the image content.

**Example Response**:

```json
{
  "caption": "Taza de café y prensa francesa sobre una mesa de cocina.",
  "description": "Una taza de café de cerámica azul oscuro reposa sobre un plato de madera junto a una cuchara, frente a una prensa francesa de acero inoxidable. La escena se ubica en una cocina con una encimera de tono claro y un azulejo geométrico como fondo. Hay vapor saliendo suavemente de la taza, indicando que el café está caliente.",
  "mainColors": ["#CABDA7", "#8C8373", "#5E5A4F", "#3A3A38", "#1E1E1E"]
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Technologies Used

- **Next.js 14**: A React framework for production.
- **Vercel AI SDK**: Provides AI capabilities to enhance your application.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Lucide Icons**: A library of beautiful, open-source icons.

## Credits

- Developed by **Enrique Pina**.
- UI components powered by **shadcn** and **aceternity**.
- The UI has been inspired by the clean and modern design of [`profanity.dev`](https://www.profanity.dev/). I appreciate the elegance and simplicity of their design and have drawn inspiration from it to create a user-friendly experience.
