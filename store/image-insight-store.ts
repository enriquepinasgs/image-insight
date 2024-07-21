import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import { OutputType } from "@/lib/image.types";

type ImageInsightStore = {
  imageUrl: string | undefined;
  setImageUrl: (imageUrl: string | undefined) => void;
  insight: OutputType | undefined;
  setInsight: (insight: OutputType | undefined) => void;
};

export const useImageInsightStore = createWithEqualityFn<ImageInsightStore>(
  (set) => ({
    imageUrl: undefined,
    insight: undefined,
    setImageUrl: (imageUrl: string | undefined) =>
      set((state) => {
        return { ...state, imageUrl };
      }),
    setInsight: (insight: OutputType | undefined) =>
      set((state) => {
        return { ...state, insight };
      }),
  }),
  shallow
);
