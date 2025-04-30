import { api } from "@/lib/axios"

// Types for the chat request and response
interface ChatRequest {
    message: string
    specialization: "general"
    language: "en"
}

interface ChatResponse {
    status: string
    message: string
    result: {
        response: {
            message: string
            recommendations: string[]
            warnings: string[]
            references: string[]
            followUp: string[]
        }
        metadata: {
            specialization: string
            confidence: string
            requiresPhysicianConsult: boolean
            emergencyLevel: string
            topRelatedSpecialties: string[]
        }
    }
    cacheTime: number
    metadata: {
        language: string
        specialization: string
        queryTime: string
    }
}

export const chatService = {
    async sendMessage(message: string): Promise<string> {
        try {
            const response = await fetch(
                "https://ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com/chat?noqueue=1",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
                        "X-RapidAPI-Host":
                            "ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com",
                    },
                    body: JSON.stringify({
                        message,
                        specialization: "general",
                        language: "en",
                    }),
                }
            )

            if (!response.ok) {
                const error = await response.json()
                if (error.message?.includes("exceeded the MONTHLY quota")) {
                    return "Our system is currently unavailable. Please try again later."
                }
                throw new Error("Failed to get chat response")
            }

            const data = (await response.json()) as ChatResponse
            return data.result.response.message
        } catch (error: any) {
            console.error("Chat service error:", error)
            return "Our system is currently unavailable. Please try again later."
        }
    },
}