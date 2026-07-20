import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: 'gpt-4o-mini', // və ya istifadə etdiyin başqa model
    messages,
    tools: {
      // Sənin xüsusi alətin: Məsələn, layihənin analitika xalını hesablayır
      scoreProject: tool({
        description: 'Evaluates and scores a frontend project build or repository.',
        parameters: z.object({
          projectName: z.string().describe('The name of the project'),
          performanceScore: z.number().min(0).max(100).describe('Performance score out of 100'),
          accessibilityScore: z.number().min(0).max(100).describe('Accessibility score out of 100'),
          status: z.enum(['excellent', 'needs_work', 'critical']).describe('Project health status'),
          recommendation: z.string().describe('Key actionable tip for improvement'),
        }),
        execute: async ({ projectName, performanceScore, accessibilityScore, status, recommendation }) => {
          // Burada simulyasiya edilmiş cavab qaytarılır
          return {
            projectName,
            performanceScore,
            accessibilityScore,
            status,
            recommendation,
            timestamp: new Date().toISOString(),
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}