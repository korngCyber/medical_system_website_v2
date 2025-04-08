"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const slides = [
  {
    title: "Quality Medical Supplies",
    description: "Trusted by healthcare professionals worldwide",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Shop Now",
    link: "/products",
  },
  {
    title: "New Arrivals",
    description: "Discover our latest medical equipment and supplies",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Explore",
    link: "/products/new",
  },
  {
    title: "Special Offers",
    description: "Save on essential medical supplies this month",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "View Deals",
    link: "/products/deals",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto scroll functionality - changed from 5000ms to 2000ms (2 seconds)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide()
    }, 2000) // Changed to 2 seconds

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Pause auto scroll on hover
  const pauseAutoScroll = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Resume auto scroll when not hovering - also changed to 2000ms
  const resumeAutoScroll = () => {
    timerRef.current = setInterval(() => {
      nextSlide()
    }, 2000) // Changed to 2 seconds
  }

  return (
    <div
      className="relative overflow-hidden h-[500px] md:h-[600px]"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
    >
      {/* Slides */}
      <div className="h-full relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            </div>
            <div className="container relative h-full flex flex-col justify-center items-start text-white p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge className="bg-primary text-primary-foreground mb-4">Featured</Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {slide.title}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-8 max-w-xl text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href={slide.link}>
                  <Button size="lg" className="group">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 z-10 rounded-full h-12 w-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 z-10 rounded-full h-12 w-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentSlide === index ? "bg-primary w-8" : "bg-white/50 hover:bg-white/80",
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
