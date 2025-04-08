import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/hooks/use-cart"
import ChatbotButton from "@/components/chatbot-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MediCare - Medical Supply System",
  description: "Your trusted partner for quality medical supplies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <div className="flex-1">{children}</div>
                <Footer />
                <ChatbotButton />
                <Toaster />
              </div>
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'