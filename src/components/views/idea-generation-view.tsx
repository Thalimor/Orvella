
"use client";

import { z } from "zod";
import { generateIdeas } from "@/ai/flows/idea-generation";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

const formSchema = z.object({
  topic: z.string().min(3, "Please enter a topic."),
});

export function IdeaGenerationView() {
  return (
    <AiToolLayout
      formSchema={formSchema}
      defaultValues={{ topic: "" }}
      aiFunction={generateIdeas}
      actionButtonText="Generate Ideas"
      outputTitle="Generated Ideas"
      getExistingOutput={(output) => (output ? { existingIdeas: output.ideas } : {})}
      renderForm={(form) => (
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-lg mb-2">Topic</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'sustainable living', 'sci-fi movie plots'" {...field} className="bg-black/40 border-white/20 focus:border-primary transition-colors duration-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      renderOutput={(output) => (
         output?.ideas ? (
          <ul className="space-y-3">
            {output.ideas.map((idea, index) => (
              <li key={index} className="flex items-start gap-3 p-2 rounded-md hover:bg-white/5 transition-colors duration-200">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground/80">{idea}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Your generated ideas will appear here.</p>
        )
      )}
    />
  );
}
