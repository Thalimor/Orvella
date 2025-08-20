// This file uses server-side code, and must have the `'use server'` directive.
'use server';

/**
 * @fileOverview AI Prompt Engineer agent.
 *
 * - generatePrompt - A function that generates effective AI prompts based on user intentions.
 * - GeneratePromptInput - The input type for the generatePrompt function.
 * - GeneratePromptOutput - The return type for the generatePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromptInputSchema = z.object({
  intention: z
    .string()
    .describe('The user intention for which to generate an AI prompt.'),
});
export type GeneratePromptInput = z.infer<typeof GeneratePromptInputSchema>;

const GeneratePromptOutputSchema = z.object({
  prompt: z.string().describe('The generated AI prompt.'),
});
export type GeneratePromptOutput = z.infer<typeof GeneratePromptOutputSchema>;

export async function generatePrompt(input: GeneratePromptInput): Promise<GeneratePromptOutput> {
  return generatePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromptPrompt',
  input: {schema: GeneratePromptInputSchema},
  output: {schema: GeneratePromptOutputSchema},
  prompt: `You are an AI prompt engineer. Your job is to create effective prompts for other AI models, based on the user's stated intention.

Intention: {{{intention}}}

Effective Prompt:`, // crucial change
});

const generatePromptFlow = ai.defineFlow(
  {
    name: 'generatePromptFlow',
    inputSchema: GeneratePromptInputSchema,
    outputSchema: GeneratePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
