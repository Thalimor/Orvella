'use server';

/**
 * @fileOverview A text refinement AI agent.
 *
 * - refineText - A function that refines text for clarity and tone.
 * - RefineTextInput - The input type for the refineText function.
 * - RefineTextOutput - The return type for the refineText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineTextInputSchema = z.object({
  text: z.string().describe('The text to be refined.'),
});
export type RefineTextInput = z.infer<typeof RefineTextInputSchema>;

const RefineTextOutputSchema = z.object({
  refinedText: z.string().describe('The refined text.'),
});
export type RefineTextOutput = z.infer<typeof RefineTextOutputSchema>;

export async function refineText(input: RefineTextInput): Promise<RefineTextOutput> {
  return refineTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineTextPrompt',
  input: {schema: RefineTextInputSchema},
  output: {schema: RefineTextOutputSchema},
  prompt: `Please refine the following text for clarity, tone, and style:

{{{text}}}`, 
});

const refineTextFlow = ai.defineFlow(
  {
    name: 'refineTextFlow',
    inputSchema: RefineTextInputSchema,
    outputSchema: RefineTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
