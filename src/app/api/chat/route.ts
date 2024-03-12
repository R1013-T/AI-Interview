import { AzureKeyCredential, OpenAIClient } from '@azure/openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const client = new OpenAIClient(
  process.env.AZURE_OPENAI_ENDPOINT!,
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY!),
)

export const runtime = 'edge'

export async function POST(request: Request) {
  const { messages } = await request.json()

  const response = await client.streamChatCompletions(
    process.env.AZURE_OPENAI_DEPLOYMENT_NAME_35_1106!,
    messages,
  )

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
