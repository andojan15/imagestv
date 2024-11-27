import { NextResponse } from 'next/server';
import Together from "together-ai";

const together = new Together({ 
  apiKey: process.env.TOGETHER_API_KEY 
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Please enter a prompt" },
        { status: 400 }
      );
    }

    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1-schnell-Free",
      prompt: prompt,
      width: 1024,
      height: 768,
      steps: 4,
      n: 1,
      response_format: "b64_json"
    });

    return NextResponse.json(response.data[0].b64_json);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error generating image" },
      { status: 500 }
    );
  }
}