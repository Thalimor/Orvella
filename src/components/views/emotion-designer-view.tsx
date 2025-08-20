
"use client";

import { useState } from "react";
import { z } from "zod";
import { transformTextEmotion } from "@/ai/flows/emotion-designer";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  text: z.string().min(10, "Please enter at least 10 characters."),
  emotion: z.string().min(2, "Please select or enter an emotion."),
});

const emotionCategories = {
    "Negative Emotions": ["Anger", "Sadness", "Broken Heart", "Regret", "Nostalgia", "Longing", "Melancholy", "Grief", "Loneliness", "Despair", "Remorse", "Lament", "Defiance", "Sarcasm", "Resignation", "Vulnerability", "Foreboding", "Anxiety", "Betrayal", "Jealousy", "Envy", "Frustration", "Fear", "Panic", "Disgust", "Shock", "Shame"],
    "Positive Emotions": ["Joy", "Euphoria", "Gratitude", "Admiration", "Awe", "Hope", "Tenderness", "Affection", "Whimsy", "Happiness", "Fascination", "Respect", "Passion", "Triumph", "Contentment", "Peace", "Serenity", "Surprise", "Pride"],
    "Complex & Nuanced": ["Apology", "Ambivalence", "Curiosity", "Confusion", "Shyness"]
};


export function EmotionDesignerView() {
  const [customEmotion, setCustomEmotion] = useState("");

  return (
    <AiToolLayout
      formSchema={formSchema}
      defaultValues={{ text: "", emotion: "" }}
      aiFunction={transformTextEmotion}
      actionButtonText="Transform Text"
      outputTitle="Emotionally Transformed Text"
      getExistingOutput={(output) => (output ? { existingTransformedText: output.transformedText } : {})}
      getOutputText={(output) => output?.transformedText || ""}
      renderForm={(form) => (
        <div className="flex flex-col h-full">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-primary text-lg mb-2">Your Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the text you want to transform..."
                    className="resize-none bg-black/40 border-white/20 focus:border-primary transition-colors duration-300 h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel className="text-primary text-lg mb-2">Choose an Emotion</FormLabel>
          
          <ScrollArea className="h-48 w-full p-4 rounded-md border border-white/10 bg-black/20 mb-4">
            {Object.entries(emotionCategories).map(([category, emotions]) => (
                <div key={category} className="mb-6">
                    <h4 className="text-secondary font-semibold mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                    {emotions.map((emotion) => (
                        <Button
                            key={emotion}
                            type="button"
                            variant={form.watch("emotion") === emotion ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                form.setValue("emotion", emotion);
                                setCustomEmotion("");
                            }}
                            className={cn(form.watch("emotion") === emotion && "bg-primary text-primary-foreground")}
                        >
                        {emotion}
                        </Button>
                    ))}
                    </div>
                </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>

          <FormField
            control={form.control}
            name="emotion"
            render={() => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-sm">Or type a custom emotion</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., 'Cautious Optimism'"
                    value={customEmotion}
                    onChange={(e) => {
                        setCustomEmotion(e.target.value);
                        form.setValue("emotion", e.target.value);
                    }}
                    className="bg-black/40 border-white/20 focus:border-primary transition-colors duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      renderOutput={(output) => (
        <div className="text-foreground/80 whitespace-pre-wrap bg-black/20 p-4 rounded-md border border-white/10 min-h-[150px]">
          {output?.transformedText || "The transformed text will appear here."}
        </div>
      )}
    />
  );
}
