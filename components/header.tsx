// components/header.tsx
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { items } = useCart()
  const { toast } = useToast()

  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    })
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-2xl mr-8">
              MediCare
            </Link>

            <nav className="hidden md:flex gap-6">
              {routes.map((route) => (
                  <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          pathname === route.href ? "text-primary" : "text-muted-foreground",
                      )}
                  >
                    {route.label}
                  </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {items.length}
                    </Badge>
                )}
              </Button>
            </Link>

            <ModeToggle />

            {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
            <div className="md:hidden border-t p-4">
              <nav className="flex flex-col gap-4">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary p-2",
                            pathname === route.href ? "text-primary bg-muted rounded-md" : "text-muted-foreground",
                        )}
                    >
                      {route.label}
                    </Link>
                ))}
                {!user && (
                    <>
                      <Link href="/login">
                        <Button className="w-full" variant="outline">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </>
                )}
              </nav>
            </div>
        )}
      </header>
  )
}