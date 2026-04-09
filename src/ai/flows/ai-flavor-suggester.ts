'use server';
/**
 * @fileOverview An AI granizado flavor suggester. Clients can use this to get unique flavor combinations.
 *
 * - aiFlavorSuggester - A function that handles the flavor suggestion process.
 * - AIFlavorSuggesterInput - The input type for the aiFlavorSuggester function.
 * - AIFlavorSuggesterOutput - The return type for the aiFlavorSuggester function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIFlavorSuggesterInputSchema = z.object({
  preferences: z
    .string()
    .describe(
      'A description of the user\'s flavor preferences, preferred ingredients, or desired taste profile (e.g., "tropical fruits", "something sweet and tangy", "seasonal berries").'
    ),
});
export type AIFlavorSuggesterInput = z.infer<typeof AIFlavorSuggesterInputSchema>;

const AIFlavorSuggesterOutputSchema = z.object({
  flavorName: z.string().describe('A creative and enticing name for the granizado flavor.'),
  description: z.string().describe('A short, appealing description of the flavor combination.'),
  ingredients: z.array(z.string()).describe('A list of the main ingredients used in this granizado flavor.'),
});
export type AIFlavorSuggesterOutput = z.infer<typeof AIFlavorSuggesterOutputSchema>;

export async function aiFlavorSuggester(input: AIFlavorSuggesterInput): Promise<AIFlavorSuggesterOutput> {
  return aiFlavorSuggesterFlow(input);
}

const aiFlavorSuggesterPrompt = ai.definePrompt({
  name: 'aiFlavorSuggesterPrompt',
  input: { schema: AIFlavorSuggesterInputSchema },
  output: { schema: AIFlavorSuggesterOutputSchema },
  prompt: `You are an expert granizado (shaved ice drink) flavor creator. Your goal is to suggest unique and delicious flavor combinations based on the user's preferences.

Consider popular ingredients, seasonal availability, and innovative pairings to create an exciting new granizado flavor.

User Preferences: {{{preferences}}}

Suggest a creative granizado flavor combination.`,
});

const aiFlavorSuggesterFlow = ai.defineFlow(
  {
    name: 'aiFlavorSuggesterFlow',
    inputSchema: AIFlavorSuggesterInputSchema,
    outputSchema: AIFlavorSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await aiFlavorSuggesterPrompt(input);
    return output!;
  }
);
