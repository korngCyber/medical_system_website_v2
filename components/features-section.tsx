import { Card, CardContent } from "@/components/ui/card"
import { Truck, CreditCard, ShieldCheck, HeartPulse, Stethoscope, Pill } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Fast Shipping",
      description: "Free shipping on orders over $100",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Secure Payment",
      description: "Multiple payment options available",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Quality Guarantee",
      description: "All products meet medical standards",
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-primary" />,
      title: "Healthcare Expertise",
      description: "Backed by medical professionals",
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      title: "Professional Support",
      description: "Expert advice on product selection",
    },
    {
      icon: <Pill className="h-8 w-8 text-primary" />,
      title: "Wide Product Range",
      description: "Comprehensive selection of medical supplies",
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best medical supplies with exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
