'use server';
/**
 * @fileOverview AI-powered idea generator.
 *
 * - generateIdeas - A function that generates ideas based on a topic.
 * - IdeaGenerationInput - The input type for the generateIdeas function.
 * - IdeaGenerationOutput - The return type for the generateIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdeaGenerationInputSchema = z.object({
  topic: z.string().describe('The topic to generate ideas for.'),
  existingIdeas: z.array(z.string()).optional().describe('A list of previously generated ideas to be refined.'),
  refinementInstruction: z.string().optional().describe('Instructions on how to refine the existing ideas.'),
});
export type IdeaGenerationInput = z.infer<typeof IdeaGenerationInputSchema>;

const IdeaGenerationOutputSchema = z.object({
  ideas: z.array(z.string()).describe('A list of generated ideas.'),
});
export type IdeaGenerationOutput = z.infer<typeof IdeaGenerationOutputSchema>;

export async function generateIdeas(input: IdeaGenerationInput): Promise<IdeaGenerationOutput> {
  return ideaGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ideaGenerationPrompt',
  input: {schema: IdeaGenerationInputSchema},
  output: {schema: IdeaGenerationOutputSchema},
  prompt: `You are a creative idea generator.

{{#if refinementInstruction}}
You are refining a previous list of ideas based on user feedback.

Topic: {{{topic}}}
Previous ideas:
{{#each existingIdeas}}
- {{this}}
{{/each}}

User's Refinement Instruction: "{{{refinementInstruction}}}"

Based on the instruction, generate a new, improved list of ideas.
{{else}}
Given a topic, you will generate a list of fresh and interesting ideas related to that topic.

Topic: {{{topic}}}
{{/if}}

Ideas:`,
});

const ideaGenerationFlow = ai.defineFlow(
  {
    name: 'ideaGenerationFlow',
    inputSchema: IdeaGenerationInputSchema,
    outputSchema: IdeaGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
