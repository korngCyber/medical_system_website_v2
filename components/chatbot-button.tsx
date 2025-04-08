"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Loader2, Bot, User, ArrowDown } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "👋 Hello! I'm MediCare's virtual assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen, messages])

  useEffect(() => {
    const handleScroll = () => {
      if (!messagesContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100

      setShowScrollButton(isScrolledUp)
    }

    const container = messagesContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Improved responses based on keywords
    let responseText =
      "I'm not sure how to help with that. Could you provide more details or try asking about our products, shipping, returns, or payment options?"

    const lowercaseInput = input.toLowerCase()

    if (lowercaseInput.includes("delivery") || lowercaseInput.includes("shipping")) {
      responseText =
        "We offer free shipping on all orders over $100! Standard delivery takes 2-3 business days, while express delivery (available for an additional $15) arrives within 24 hours. International shipping is also available to most countries."
    } else if (lowercaseInput.includes("payment") || lowercaseInput.includes("pay")) {
      responseText =
        "We accept various payment methods including all major credit/debit cards, PayPal, Apple Pay, and bank transfers. All payments are processed securely through our encrypted payment gateway."
    } else if (lowercaseInput.includes("return") || lowercaseInput.includes("refund")) {
      responseText =
        "Our hassle-free return policy allows returns within 30 days of purchase. Simply contact our customer service team to initiate the process. Please ensure products are unused and in their original packaging. Refunds are typically processed within 5-7 business days."
    } else if (lowercaseInput.includes("product") || lowercaseInput.includes("item")) {
      responseText =
        "We offer a comprehensive range of medical supplies including diagnostic equipment, emergency kits, protective gear, mobility aids, and respiratory products. All our products are sourced from trusted manufacturers and meet strict quality standards. Is there a specific product category you're interested in?"
    } else if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi") || lowercaseInput.includes("hey")) {
      responseText =
        "Hello! Welcome to MediCare. I'm here to help you find the right medical supplies or answer any questions you might have about our products and services. What can I assist you with today?"
    } else if (
      lowercaseInput.includes("discount") ||
      lowercaseInput.includes("coupon") ||
      lowercaseInput.includes("offer")
    ) {
      responseText =
        "We regularly offer special discounts and promotions! Currently, new customers can get 10% off their first order with code WELCOME10. We also have bulk discounts for healthcare facilities and special offers for returning customers. Would you like to join our newsletter to stay updated on our latest deals?"
    } else if (
      lowercaseInput.includes("contact") ||
      lowercaseInput.includes("speak") ||
      lowercaseInput.includes("human")
    ) {
      responseText =
        "If you'd like to speak with a human representative, you can reach our customer service team at 1-800-MEDICARE (1-800-633-4227) Monday through Friday, 9am-6pm EST. Alternatively, you can email us at support@medicare.com and we'll respond within 24 hours."
    } else if (lowercaseInput.includes("thermometer") || lowercaseInput.includes("temperature")) {
      responseText =
        "Our digital thermometers provide accurate temperature readings within seconds. They feature fever alerts, memory function, and are suitable for all ages. The price starts at $19.99 and they come with a 1-year warranty. Would you like more information about a specific model?"
    } else if (lowercaseInput.includes("blood pressure") || lowercaseInput.includes("bp monitor")) {
      responseText =
        "Our blood pressure monitors are clinically validated for accuracy. They feature large displays, irregular heartbeat detection, and can store readings for multiple users. Prices range from $59.99 to $129.99 depending on features. Would you like me to recommend a specific model based on your needs?"
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseText,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] z-50"
          >
            <Card className="border shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 px-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-primary-foreground/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm">MediCare Assistant</h3>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                      <span className="text-xs text-primary-foreground/80">Online</span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 text-xs"
                >
                  24/7 Support
                </Badge>
              </CardHeader>

              <CardContent className="p-0">
                <div ref={messagesContainerRef} className="h-[350px] overflow-y-auto p-4 space-y-4 bg-muted/20">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl p-3",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted rounded-tl-none",
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.role === "assistant" ? (
                            <Bot className="h-4 w-4 text-primary" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {message.role === "assistant" ? "MediCare Bot" : "You"}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted max-w-[80%] rounded-2xl p-3 rounded-tl-none">
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium">MediCare Bot</span>
                        </div>
                        <div className="flex space-x-1 items-center h-6">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-xs text-muted-foreground">Typing a response...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {showScrollButton && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-[70px] right-4 rounded-full shadow-md"
                    onClick={scrollToBottom}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>

              <CardFooter className="p-3 border-t bg-background">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          className={cn(
            "rounded-full h-14 w-14 shadow-lg",
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90",
          )}
          onClick={toggleChat}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>
    </>
  )
}
