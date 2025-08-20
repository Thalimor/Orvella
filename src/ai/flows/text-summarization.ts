'use server';

/**
 * @fileOverview A text summarization AI agent.
 *
 * - summarizeText - A function that handles the text summarization process.
 * - SummarizeTextInput - The input type for the summarizeText function.
 * - SummarizeTextOutput - The return type for the summarizeText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextInputSchema = z.object({
  text: z.string().describe('The text to summarize.'),
  existingSummary: z.string().optional().describe('An existing summary to be refined.'),
  refinementInstruction: z.string().optional().describe('Instructions on how to refine the existing summary.'),
});
export type SummarizeTextInput = z.infer<typeof SummarizeTextInputSchema>;

const SummarizeTextOutputSchema = z.object({
  summary: z.string().describe('The summary of the text.'),
});
export type SummarizeTextOutput = z.infer<typeof SummarizeTextOutputSchema>;

export async function summarizeText(input: SummarizeTextInput): Promise<SummarizeTextOutput> {
  return summarizeTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextPrompt',
  input: {schema: SummarizeTextInputSchema},
  output: {schema: SummarizeTextOutputSchema},
  prompt: `{{#if refinementInstruction}}
You are refining a previous summary based on user feedback.

Original Text: 
"{{{text}}}"

Previous Summary:
"{{{existingSummary}}}"

User's Refinement Instruction: "{{{refinementInstruction}}}"

Based on the instruction, generate a new, improved summary.
{{else}}
Summarize the following text:

"{{text}}"
{{/if}}`,
});

const summarizeTextFlow = ai.defineFlow(
  {
    name: 'summarizeTextFlow',
    inputSchema: SummarizeTextInputSchema,
    outputSchema: SummarizeTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
