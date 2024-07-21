import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { CheckIcon, ClipboardIcon, FileJsonIcon } from "lucide-react";
import { toast } from "sonner";

export function JsonViewDialog({
  anyObject,
  classname,
}: {
  anyObject: object;
  classname?: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={cn("gap-2", classname)}>
          View JSON
          <FileJsonIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>JSON response</AlertDialogTitle>
        </AlertDialogHeader>
        <button
          onClick={() => {
            copyToClipboard(JSON.stringify(anyObject, null, "\t"));
            toast.success("json copied to clipboard");
          }}
          className="group flex border rounded-md bg-stone-50 p-2 overflow-hidden relative text-start"
        >
          <pre className="overflow-auto">
            {JSON.stringify(anyObject, null, "\t")}
          </pre>
          {isCopied ? (
            <CheckIcon className=" bg-background absolute top-0 w-4 h-4 right-0 m-4 group-hover:opacity-100 opacity-0 text-foreground" />
          ) : (
            <ClipboardIcon className="bg-background absolute top-0 w-4 h-4 right-0 m-4 group-hover:opacity-100 opacity-0 text-foreground" />
          )}
        </button>
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
