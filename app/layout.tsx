"use client"

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
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    // Define routes where Header, Footer, and ChatbotButton should not be displayed
    const excludedRoutes = ["/login", "/register"]

    const shouldHideHeaderFooter = excludedRoutes.includes(pathname)

    const isCenteredPage = excludedRoutes.includes(pathname)

    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <AuthProvider>
            <CartProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div className={`relative flex min-h-screen flex-col ${isCenteredPage ? "justify-center items-center" : ""}`}>
                        {!shouldHideHeaderFooter && <Header />}
                        <div className={`flex-1 ${isCenteredPage ? "w-full max-w-md" : ""}`}>{children}</div>
                        {!shouldHideHeaderFooter && <Footer />}
                        {!shouldHideHeaderFooter && <ChatbotButton />}
                        <Toaster />
                    </div>
                </ThemeProvider>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    )
}