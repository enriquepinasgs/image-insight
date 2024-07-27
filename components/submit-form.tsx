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
import { SparklesIcon } from "lucide-react";

export const InsightFormSchema = z.object({
  imageUrl: z.string().url(),
  language: z.string(),
});

export function SubmitForm({
  onSubmit,
  disabled = false,
}: {
  onSubmit: (data: z.infer<typeof InsightFormSchema>) => void;
  disabled?: boolean;
}) {
  const form = useForm<z.infer<typeof InsightFormSchema>>({
    resolver: zodResolver(InsightFormSchema),
    defaultValues: { language: "spanish", imageUrl: "" },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 w-full "
      >
        <FormField
          disabled={disabled}
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
              <Select
                disabled={disabled}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-min">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={disabled} className="gap-2">
          <span>Analyze</span> <SparklesIcon className="w-4 h-4"></SparklesIcon>
        </Button>
      </form>
    </Form>
  );
}
