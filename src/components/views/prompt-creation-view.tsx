
"use client";

import { z } from "zod";
import { generatePrompt } from "@/ai/flows/prompt-engineer";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  intention: z.string().min(10, "Please describe your intention in at least 10 characters."),
});

export function PromptCreationView() {
  return (
    <AiToolLayout
      formSchema={formSchema}
      defaultValues={{ intention: "" }}
      aiFunction={generatePrompt}
      actionButtonText="Engineer Prompt"
      outputTitle="Engineered Prompt"
      getExistingOutput={(output) => (output ? { existingPrompt: output.prompt } : {})}
      getOutputText={(output) => output?.prompt || ""}
      renderForm={(form) => (
        <FormField
          control={form.control}
          name="intention"
          render={({ field }) => (
            <FormItem className="h-full flex flex-col">
              <FormLabel className="text-primary text-lg mb-2">Your Intention</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what you want the AI to do. e.g., 'Create a marketing slogan for a new coffee brand that is eco-friendly.'"
                  className="flex-grow resize-none bg-black/40 border-white/20 focus:border-primary transition-colors duration-300 h-64"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      renderOutput={(output) => (
        <div className="text-foreground/80 whitespace-pre-wrap bg-black/20 p-4 rounded-md border border-white/10 min-h-[150px]">
          {output?.prompt || "The engineered prompt will appear here."}
        </div>
      )}
    />
  );
}
