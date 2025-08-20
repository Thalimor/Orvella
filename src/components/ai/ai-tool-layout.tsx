"use client";

import { useState, type ReactNode } from "react";
import { useForm, type UseFormReturn, type SubmitHandler, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType, z } from "zod";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "../ui/textarea";

interface AiToolLayoutProps<TInput extends object, TOutput> {
  formSchema: ZodType<TInput>;
  defaultValues: TInput;
  aiFunction: (input: TInput) => Promise<TOutput>;
  renderForm: (form: UseFormReturn<TInput>) => ReactNode;
  renderOutput: (output: TOutput | null) => ReactNode;
  getExistingOutput: (output: TOutput) => any;
  actionButtonText?: string;
  outputTitle?: string;
  formContainerClassName?: string;
}

export function AiToolLayout<TInput extends object, TOutput>({
  formSchema,
  defaultValues,
  aiFunction,
  renderForm,
  renderOutput,
  getExistingOutput,
  actionButtonText = "Generate",
  outputTitle = "Result",
}: AiToolLayoutProps<TInput, TOutput>) {
  const [output, setOutput] = useState<TOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refinementInstruction, setRefinementInstruction] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isSubmitting } = useFormState({ control: form.control });

  const onSubmit: SubmitHandler<TInput> = async (data) => {
    setIsLoading(true);
    if (!refinementInstruction) {
      setOutput(null); 
    }
    
    try {
      const result = await aiFunction({ 
        ...data,
        ...getExistingOutput(output!),
        refinementInstruction: refinementInstruction || undefined,
      });
      setOutput(result);
      setRefinementInstruction("");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to process the request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = () => {
    if (refinementInstruction.trim()) {
      form.handleSubmit(onSubmit)();
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <Card className="glassmorphic p-2">
        <CardContent className="p-4 h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col h-full">
              <div className="flex-grow">
                {renderForm(form)}
              </div>
              <Button type="submit" disabled={isLoading} className="w-full" variant="outline">
                {isLoading && !refinementInstruction ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  actionButtonText
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="glassmorphic p-2 min-h-[300px] md:min-h-0 flex flex-col">
        <CardHeader>
            <CardTitle className="text-2xl text-primary">{outputTitle}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 h-full flex flex-col flex-grow">
          <Separator className="mb-4 bg-white/10"/>
          <div className="flex-grow overflow-y-auto text-foreground/90 mb-4">
             {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              renderOutput(output)
            )}
          </div>
          {output && (
            <div className="mt-auto pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5"/>
                    Refine Result
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                    Not quite right? Tell the AI how to improve it.
                </p>
                <div className="flex flex-col gap-3">
                    <Textarea
                        placeholder="e.g., 'Make it more formal', 'Add three more ideas about space exploration', 'Change the tone to be more optimistic'"
                        value={refinementInstruction}
                        onChange={(e) => setRefinementInstruction(e.target.value)}
                        className="bg-black/40 border-white/20 focus:border-secondary transition-colors duration-300 resize-none"
                    />
                    <Button onClick={handleRefine} disabled={isLoading || !refinementInstruction.trim()} variant="secondary" className="w-full">
                        {isLoading && refinementInstruction ? <Loader2 className="animate-spin" /> : "Refine"}
                    </Button>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
