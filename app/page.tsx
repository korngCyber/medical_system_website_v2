import { Button } from "@/components/ui/button"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import ProductsShowcase from "@/components/products-showcase"
import FeaturesSection from "@/components/features-section"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />

      <AboutSection />

      <div className="container py-12 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <ProductsShowcase />
        <div className="flex justify-center mt-8">
          <Link href="/products">
            <Button size="lg">View All Products</Button>
          </Link>
        </div>
      </div>

      <FeaturesSection />

      <div className="bg-primary/5 py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who trust our medical supplies and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
