import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash-exp"),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
