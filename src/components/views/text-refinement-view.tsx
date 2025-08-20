"use client";

import { z } from "zod";
import { refineText } from "@/ai/flows/text-refinement";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  text: z.string().min(10, "Please enter at least 10 characters."),
});

export function TextRefinementView() {
  return (
    <AiToolLayout
      formSchema={formSchema}
      defaultValues={{ text: "" }}
      aiFunction={refineText}
      actionButtonText="Refine Text"
      outputTitle="Refined Text"
      renderForm={(form) => (
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="h-full flex flex-col">
              <FormLabel className="text-primary">Your Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the text you want to improve..."
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
          {output?.refinedText || "The refined text will appear here."}
        </div>
      )}
    />
  );
}
