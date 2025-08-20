"use client";

import { z } from "zod";
import { summarizeText } from "@/ai/flows/text-summarization";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  text: z.string().min(50, "Please enter at least 50 characters to summarize."),
});

export function TextSummarizationView() {
  return (
    <AiToolLayout
      formSchema={formSchema}
      defaultValues={{ text: "" }}
      aiFunction={summarizeText}
      actionButtonText="Summarize Text"
      outputTitle="Summary"
      renderForm={(form) => (
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="h-full flex flex-col">
              <FormLabel className="text-primary">Text to Summarize</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste a long article or text here..."
                  className="flex-grow resize-none bg-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      renderOutput={(output) => (
        <div className="text-foreground/80 whitespace-pre-wrap">
          {output?.summary || "The summary will appear here."}
        </div>
      )}
    />
  );
}
