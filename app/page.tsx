import { OpenAIApiKeyDialog } from "@/components/openai-apikey-dialog";
import RequestCard from "@/components/request-card";

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-2 gap-12 px-8 relative ">
      <OpenAIApiKeyDialog classname="absolute top-0 right-0 m-6 " />
      <div className="flex items-center flex-col justify-center gap-8 ">
        <h1 className="text-7xl font-bold">ImageInsight</h1>
        <p className="text-center max-w-2xl">
          This is a powerful API that extracts essential data from images,
          primary color palettes, and descriptive captions.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <RequestCard />
      </div>
    </main>
  );
}
