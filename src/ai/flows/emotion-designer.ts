'use server';

/**
 * @fileOverview An AI agent for transforming text with emotional tones.
 *
 * - transformTextEmotion - A function that transforms text based on a selected emotion.
 * - EmotionDesignerInput - The input type for the transformTextEmotion function.
 * - EmotionDesignerOutput - The return type for the transformTextEmotion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmotionDesignerInputSchema = z.object({
  text: z.string().describe('The text to be transformed.'),
  emotion: z.string().describe('The emotional tone to apply to the text.'),
  existingTransformedText: z.string().optional().describe('An existing transformed text to refine.'),
  refinementInstruction: z.string().optional().describe('Instructions on how to refine the existing transformed text.'),
});
export type EmotionDesignerInput = z.infer<typeof EmotionDesignerInputSchema>;

const EmotionDesignerOutputSchema = z.object({
  transformedText: z.string().describe('The emotionally transformed text.'),
});
export type EmotionDesignerOutput = z.infer<typeof EmotionDesignerOutputSchema>;

export async function transformTextEmotion(input: EmotionDesignerInput): Promise<EmotionDesignerOutput> {
  return emotionDesignerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emotionDesignerPrompt',
  input: {schema: EmotionDesignerInputSchema},
  output: {schema: EmotionDesignerOutputSchema},
  prompt: `You are an expert in creative writing and emotional intelligence. 

{{#if refinementInstruction}}
You are refining a previously generated text based on user feedback.

Original Text:
"{{{text}}}"

Previously Generated Text (with the emotion of {{{emotion}}}):
"{{{existingTransformedText}}}"

User's Refinement Instruction: "{{{refinementInstruction}}}"

Based on the instruction, rewrite the text to better capture the emotion of "{{{emotion}}}".
{{else}}
Your task is to rewrite the given text to powerfully convey a specific emotion. 
Consider the wording, style, sentence structure, and presentation. Adapt the text to reflect the nuances of the chosen emotion, taking into account cultural and linguistic context for authentic expression.

Original Text:
"{{{text}}}"

Rewrite the text with the emotion of: {{{emotion}}}
{{/if}}
`,
});

const emotionDesignerFlow = ai.defineFlow(
  {
    name: 'emotionDesignerFlow',
    inputSchema: EmotionDesignerInputSchema,
    outputSchema: EmotionDesignerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
