"use client";
import { useImageInsightStore } from "@/store/image-insight-store";
import { JsonViewDialog } from "./json-view-dialog";
import { SubmitForm } from "./submit-form";

export default function RequestCard() {
  const { insight } = useImageInsightStore((state) => ({
    insight: state.insight,
  }));
  return (
    <div className="border bg-stone-50 rounded-lg w-full flex max-w-2xl flex-col gap-2 p-4 h-min shadow-lg">
      <div className="flex gap-4">
        <span className="text-accent bg-gray-600 px-2 py-0.5 border rounded-[8px] font-medium">
          GET
        </span>
        <p className="text-foreground/80 line-clamp-1">
          http://localhost/api/analyze-image/
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 w-full ">
        <SubmitForm />
      </div>
      <div className="group flex w-full h-64 border-2 rounded-md border-dashed  p-2 overflow-hidden relative items-center justify-center">
        {insight && (
          <JsonViewDialog
            anyObject={insight}
            classname="absolute top-0 right-0 m-2 group-hover:visible invisible"
          />
        )}
        {insight ? (
          <div className="flex flex-col gap-2 w-full h-full overflow-auto">
            <div className="flex flex-col w-full bg-background rounded-sm p-2 text-foregroun border">
              <span className="text-lg font-medium">Caption</span>
              <p>{insight.caption}</p>
            </div>
            <div className="flex flex-col w-full bg-background rounded-sm p-2 text-foregroun border">
              <span className="text-lg font-medium">Description</span>
              <p>{insight.description}</p>
            </div>
            <div className="flex flex-col w-full bg-background rounded-sm p-2 text-foregroun border">
              <span className="text-lg font-medium">Main colors</span>
              <div className="flex w-min [&>*:last-child]:rounded-r-md [&>*:first-child]:rounded-l-md">
                {insight.mainColors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 "
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-foreground/50">Output will be shown here</p>
        )}
      </div>
    </div>
  );
}
