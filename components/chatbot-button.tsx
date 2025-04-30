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
import { chatService } from "@/services/chat-service"

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

  const toggleChat = () => setIsOpen(!isOpen)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [isOpen, messages])

  useEffect(() => {
    const handleScroll = () => {
      if (!messagesContainerRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100)
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

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await chatService.sendMessage(input)

      const botMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
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
                    <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 text-xs">
                      24/7 Support
                    </Badge>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div ref={messagesContainerRef} className="h-[350px] overflow-y-auto p-4 space-y-4 bg-muted/20">
                      {messages.map((message) => (
                          <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[80%] rounded-2xl p-3",
                                message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none",
                            )}>
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
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
              className={cn("rounded-full h-14 w-14 shadow-lg", isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90")}
              onClick={toggleChat}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </Button>
        </motion.div>
      </>
  )
}