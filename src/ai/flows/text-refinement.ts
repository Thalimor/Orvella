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
  existingRefinedText: z.string().optional().describe('An existing refined text to be further refined.'),
  refinementInstruction: z.string().optional().describe('Instructions on how to further refine the text.'),
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
  prompt: `{{#if refinementInstruction}}
You are refining a previously refined text based on user feedback.

Original Text:
"{{{text}}}"

Previously Refined Text:
"{{{existingRefinedText}}}"

User's Refinement Instruction: "{{{refinementInstruction}}}"

Based on the instruction, generate a new, improved version of the refined text.
{{else}}
Please refine the following text for clarity, tone, and style:

"{{{text}}}"
{{/if}}`,
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
