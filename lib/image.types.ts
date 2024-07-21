import { z } from "zod";

export const OutputSchema = z.object({
  caption: z.string(),
  description: z.string(),
  mainColors: z.array(z.string()),
});

export type OutputType = z.infer<typeof OutputSchema>;
