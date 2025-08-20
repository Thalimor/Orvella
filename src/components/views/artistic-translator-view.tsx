"use client";

import { z } from "zod";
import { translateArtistically, ArtisticTranslatorOutput } from "@/ai/flows/artistic-translator";
import { AiToolLayout } from "@/components/ai/ai-tool-layout";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  text: z.string().min(2, "Please enter text to translate."),
  targetLanguage: z.string().min(2, "Please select a target language."),
});

const languages = ["English", "Spanish", "French", "German", "Japanese", "Chinese", "Russian", "Arabic", "Portuguese", "Italian"];

const OutputDisplay = ({ output }: { output: ArtisticTranslatorOutput | null }) => (
  <Tabs defaultValue="artistic" className="w-full h-full flex flex-col">
    <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-white/10">
      <TabsTrigger value="artistic">Artistic Translation</TabsTrigger>
      <TabsTrigger value="literal">Literal Translation</TabsTrigger>
    </TabsList>
    <div className="flex-grow mt-4 overflow-y-auto">
      <TabsContent value="artistic">
        <div className="text-foreground/80 whitespace-pre-wrap bg-black/20 p-4 rounded-md border border-white/10 min-h-[150px]">
            {output?.artisticTranslation || "The artistic translation will appear here."}
        </div>
      </TabsContent>
      <TabsContent value="literal">
        <div className="text-foreground/80 whitespace-pre-wrap bg-black/20 p-4 rounded-md border border-white/10 min-h-[150px]">
            {output?.literalTranslation || "The literal translation will appear here."}
        </div>
      </TabsContent>
    </div>
  </Tabs>
);

export function ArtisticTranslatorView() {
  return (
    <AiToolLayout
      formSchema={formSchema}
      defaultValues={{ text: "", targetLanguage: "" }}
      aiFunction={translateArtistically}
      actionButtonText="Translate Artistically"
      outputTitle="Translation"
      getExistingOutput={(output) => ({ 
        existingTranslation: {
            literal: output.literalTranslation,
            artistic: output.artisticTranslation,
        }
      })}
      renderForm={(form) => (
        <div className="flex flex-col h-full gap-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex-grow flex flex-col">
                <FormLabel className="text-primary text-lg mb-2">Text to Translate</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the text you want to translate..."
                    className="flex-grow resize-none bg-black/40 border-white/20 focus:border-primary transition-colors duration-300 h-48"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-lg mb-2">Target Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-black/40 border-white/20">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      renderOutput={(output) => <OutputDisplay output={output} />}
    />
  );
}
