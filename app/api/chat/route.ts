import { NextResponse } from "next/server";

import { createOpenAI } from '@ai-sdk/openai';
import { generateText,streamText } from 'ai';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export const runtime = "edge";


export async function POST(
    req: Request,
  ) { 
        const body=await req.json()
        const { text } = await generateText({
            model: groq('llama3-8b-8192'),
            prompt: body.message,
          });

      return   NextResponse.json({ content:text });
  }