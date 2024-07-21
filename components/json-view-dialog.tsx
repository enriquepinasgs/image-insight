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
import { FileJsonIcon } from "lucide-react";

export function JsonViewDialog({
  anyObject,
  classname,
}: {
  anyObject: object;
  classname?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size={"icon"} className={classname}>
          <FileJsonIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>JSON View</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex border rounded-md bg-stone-50 p-2 overflow-hidden">
          <pre className="overflow-auto">
            {JSON.stringify(anyObject, null, "\t")}
          </pre>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
