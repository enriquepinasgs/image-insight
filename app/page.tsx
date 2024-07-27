import { AppInfo } from "@/components/app-info";
import { OpenAIApiKeyDialog } from "@/components/openai-apikey-dialog";
import RequestCard from "@/components/request-card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";

export default function Home() {
  return (
    <AuroraBackground>
      <main className="min-h-screen flex flex-col md:grid md:grid-cols-2 gap-12 px-8 relative ">
        <Link
          href={"/doc"}
          className="text-foreground/60 hover:text-foreground hover:underline absolute top-0 left-1/2 -translate-x-1/2 mt-4"
        >
          Documentation
        </Link>
        <OpenAIApiKeyDialog classname="absolute top-0 right-0 m-6 " />
        <div className="flex items-center flex-col justify-center gap-8 ">
          <AppInfo />
        </div>
        <div className="flex items-center justify-center">
          <RequestCard />
        </div>
      </main>
    </AuroraBackground>
  );
}
