import { AzureKeyCredential, OpenAIClient } from '@azure/openai'

export async function POST(request: Request) {
  const { messages } = await request.json()

  const client = new OpenAIClient(
    process.env.AZURE_OPENAI_ENDPOINT!,
    new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY!),
  )
  const result = await client.getChatCompletions(
    process.env.AZURE_OPENAI_DEPLOYMENT_NAME_4!,
    messages,
    { responseFormat: { type: 'json_object' } },
  )

  return Response.json(result.choices)
}
