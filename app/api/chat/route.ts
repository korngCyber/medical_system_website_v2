import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Create a system message to define the chatbot's behavior
    const systemMessage = {
      role: "system",
      content: `You are MediCare's AI assistant, designed to help customers with questions about medical supplies and equipment.
      
      About MediCare:
      - MediCare is a leading provider of high-quality medical supplies and equipment
      - We offer products in categories including Diagnostic, Protection, Emergency, Mobility, and Respiratory
      - We provide free shipping on orders over $100
      - We have a 30-day return policy
      - We accept various payment methods including credit/debit cards, PayPal, and bank transfers
      
      Be helpful, friendly, and concise in your responses. If you don't know the answer to a question, suggest that the customer contact our support team at support@medicare.com or call 1-800-MEDICARE.`,
    }

    // Add the system message to the beginning of the messages array
    const augmentedMessages = [systemMessage, ...messages]

    // Stream the response
    const result = streamText({
      model: openai("gpt-4-turbo"),
      messages: augmentedMessages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
