"use client";
import { useGetImageInsight } from "@/hooks/api-hook";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { OutputSchema } from "@/lib/image.types";
import { useApiKeyStore } from "@/store/apikey-store";
import { useImageInsightStore } from "@/store/image-insight-store";
import { CheckIcon, ClipboardIcon, Loader2Icon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Icons } from "./icons";
import { JsonViewDialog } from "./json-view-dialog";
import { InsightFormSchema, SubmitForm } from "./submit-form";
import { Separator } from "./ui/separator";

export default function RequestCard() {
  const { insight, isLoading, setInsight, setIsLoading } = useImageInsightStore(
    (state) => ({
      insight: state.insight,
      isLoading: state.isLoading,
      setInsight: state.setInsight,
      setIsLoading: state.setIsLoading,
    })
  );
  const { currentApiKey, openModal } = useApiKeyStore((state) => ({
    currentApiKey: state.apiKey,
    openModal: state.setModalIsOpen,
  }));
  const { mutateAsync } = useGetImageInsight();

  async function requestInsight(data: z.infer<typeof InsightFormSchema>) {
    if (currentApiKey === undefined) {
      openModal(true);
      return;
    }
    setIsLoading(true);
    await mutateAsync(
      {
        imageUrl: data.imageUrl,
        language: data.language,
        apiKey: currentApiKey,
      },
      {
        onSuccess: (data) => {
          try {
            const output = OutputSchema.parse(data.data);
            setInsight(output);
            toast.success("Succesfully generated insight");
          } catch {
            toast.error("There was a problem with your request");
          }
        },
      }
    );
    setIsLoading(false);
  }
  const submit = useCallback(requestInsight, [requestInsight]);

  return (
    <div className="border bg-stone-50 rounded-lg w-full flex max-w-2xl flex-col gap-2 p-4 h-min shadow-lg relative">
      <Icons.tryItNow className="absolute top-0 left-0 w-48 -mt-16 -ml-24 " />
      <div className="flex gap-4">
        <span className="text-accent bg-gray-600 px-2 py-0.5 border rounded-[8px] font-medium">
          GET
        </span>
        <p className="text-foreground/80 line-clamp-1">
          http://localhost/api/analyze-image/
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 w-full ">
        <SubmitForm onSubmit={submit} disabled={isLoading} />
      </div>
      <div className="flex w-full h-64 border-2 rounded-md border-dashed p-2 relative items-center justify-center">
        {isLoading && (
          <div className="text-foreground/50 flex flex-col justify-center items-center">
            <Loader2Icon className="animate-spin text-primary" />
            <p>Generating insights...</p>
          </div>
        )}
        {insight === undefined && !isLoading && (
          <p className="text-foreground/50">Output will be shown here</p>
        )}
        {insight !== undefined && !isLoading && (
          <div className="flex flex-col gap-2 w-full h-full overflow-auto">
            <TextCard title="Caption" text={insight.caption} />
            <Separator decorative={true} />
            <TextCard title="Description" text={insight.description} />
            <Separator decorative={true} />
            <div className="flex items-center">
              <div className="flex flex-col w-min p-2 text-foregroun">
                <span className="text-lg font-medium">Main colors</span>
                <div className="flex w-min [&>*:last-child]:rounded-r-md [&>*:first-child]:rounded-l-md">
                  {insight.mainColors.map((color, idx) => (
                    <ColorCard key={idx} color={color} />
                  ))}
                </div>
              </div>
              <Separator orientation="vertical" />

              <JsonViewDialog
                anyObject={insight}
                classname=" self-center mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TextCard({ title, text }: { title: string; text: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <button
      onClick={() => {
        copyToClipboard(text);
        toast.success(`${title} copied to clipboard`);
      }}
      className="group relative text-start flex flex-col w-full p-2 text-foregroun"
    >
      {isCopied ? (
        <CheckIcon className="bg-background absolute top-0 w-4 h-4 right-0 m-4 group-hover:opacity-100 opacity-0 text-foreground" />
      ) : (
        <ClipboardIcon className="bg-background absolute top-0 w-4 h-4 right-0 m-4 group-hover:opacity-100 opacity-0 text-foreground" />
      )}
      <span className="text-lg font-medium">{title}</span>
      <p className="text-pretty">{text}</p>
    </button>
  );
}

function ColorCard({ color }: { color: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <button
      onClick={() => {
        copyToClipboard(color);
        toast.success(`color ${color} copied to clipboard`);
      }}
      className="group relative w-16 h-16 "
      style={{ backgroundColor: color }}
    >
      {isCopied ? (
        <CheckIcon className="bg-background border rounded-[4px] absolute top-0 w-4 h-4 right-0 m-1 group-hover:opacity-100 opacity-0 text-foreground" />
      ) : (
        <ClipboardIcon className="bg-background border rounded-[4px] absolute top-0 w-4 h-4 right-0 m-1 group-hover:opacity-100 opacity-0 text-foreground" />
      )}
    </button>
  );
}
