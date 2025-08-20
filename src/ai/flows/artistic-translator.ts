'use server';

/**
 * @fileOverview An AI agent for translating text with an artistic and literary style.
 *
 * - translateArtistically - A function that translates text both literally and artistically.
 * - ArtisticTranslatorInput - The input type for the translateArtistically function.
 * - ArtisticTranslatorOutput - The return type for the translateArtistically function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArtisticTranslatorInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  targetLanguage: z.string().describe('The target language for the translation (e.g., "English", "Japanese").'),
  existingTranslation: z.object({
    literal: z.string(),
    artistic: z.string(),
  }).optional().describe('An existing translation to refine.'),
  refinementInstruction: z.string().optional().describe('Instructions on how to refine the existing translation.'),
});
export type ArtisticTranslatorInput = z.infer<typeof ArtisticTranslatorInputSchema>;

const ArtisticTranslatorOutputSchema = z.object({
  literalTranslation: z.string().describe('The direct, literal translation of the text.'),
  artisticTranslation: z.string().describe('A refined, elegant, and literary version of the translation.'),
});
export type ArtisticTranslatorOutput = z.infer<typeof ArtisticTranslatorOutputSchema>;

export async function translateArtistically(input: ArtisticTranslatorInput): Promise<ArtisticTranslatorOutput> {
  return artisticTranslatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'artisticTranslatorPrompt',
  input: {schema: ArtisticTranslatorInputSchema},
  output: {schema: ArtisticTranslatorOutputSchema},
  prompt: `You are an expert translator and a literary artist. 
  
  {{#if refinementInstruction}}
  You are refining a previous translation based on user feedback.
  Original Text:
  "{{{text}}}"

  Previous Literal Translation:
  "{{{existingTranslation.literal}}}"

  Previous Artistic Translation:
  "{{{existingTranslation.artistic}}}"

  User's Refinement Instruction: "{{{refinementInstruction}}}"

  Based on the instruction, regenerate both the literal and artistic translations. Ensure the new translations align with the user's feedback while maintaining accuracy and literary quality.
  {{else}}
  Your task is to translate the given text into the specified target language. You must provide two versions of the translation:

  1.  **Literal Translation**: A direct and accurate translation of the original text, preserving its original meaning as closely as possible.
  2.  **Artistic Translation**: A refined and elegant version of the translation. This version should use beautiful expressions, artistic phrases, and sophisticated terminology while ensuring the original meaning remains intact.

  Original Text:
  "{{{text}}}"

  Target Language: {{{targetLanguage}}}
  {{/if}}
`,
});

const artisticTranslatorFlow = ai.defineFlow(
  {
    name: 'artisticTranslatorFlow',
    inputSchema: ArtisticTranslatorInputSchema,
    outputSchema: ArtisticTranslatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
