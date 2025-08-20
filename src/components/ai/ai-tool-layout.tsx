"use client";

import { useState, type ReactNode } from "react";
import { useForm, type UseFormReturn, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType, z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface AiToolLayoutProps<TInput extends object, TOutput> {
  formSchema: ZodType<TInput>;
  defaultValues: TInput;
  aiFunction: (input: TInput) => Promise<TOutput>;
  renderForm: (form: UseFormReturn<TInput>) => ReactNode;
  renderOutput: (output: TOutput | null) => ReactNode;
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
  actionButtonText = "Generate",
  outputTitle = "Result",
  formContainerClassName,
}: AiToolLayoutProps<TInput, TOutput>) {
  const [output, setOutput] = useState<TOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TInput> = async (data) => {
    setIsLoading(true);
    setOutput(null);
    try {
      const result = await aiFunction(data);
      setOutput(result);
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
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  actionButtonText
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="glassmorphic p-2 min-h-[300px] md:min-h-0">
        <CardHeader>
            <CardTitle className="text-2xl text-primary">{outputTitle}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 h-full flex flex-col">
          <Separator className="mb-4 bg-white/10"/>
          <div className="flex-grow overflow-y-auto text-foreground/90">
             {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              renderOutput(output)
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
