"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetImageInsight } from "@/hooks/api-hook";
import { OutputSchema } from "@/lib/image.types";
import { useApiKeyStore } from "@/store/apikey-store";
import { useImageInsightStore } from "@/store/image-insight-store";
import { SparklesIcon } from "lucide-react";
import { toast } from "sonner";

const FormSchema = z.object({
  imageUrl: z.string().url(),
  language: z.string(),
});

export function SubmitForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { language: "spanish", imageUrl: "" },
  });
  const { setInsight } = useImageInsightStore((state) => ({
    setInsight: state.setInsight,
  }));
  const { mutate } = useGetImageInsight();

  const { currentApiKey, openModal } = useApiKeyStore((state) => ({
    currentApiKey: state.apiKey,
    openModal: state.setModalIsOpen,
  }));

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (currentApiKey === undefined) {
      openModal(true);
      return;
    }
    mutate(
      {
        imageUrl: data.imageUrl,
        language: form.getValues("language"),
        apiKey: currentApiKey,
      },
      {
        onSuccess: (data) => {
          console.log(data.data);
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 w-full "
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full min-w-fit">
              <FormControl>
                <Input placeholder="image url" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className=" ">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-min">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="english">Engish</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="gap-2">
          <span>Analyze</span> <SparklesIcon className="w-4 h-4"></SparklesIcon>
        </Button>
      </form>
    </Form>
  );
}
