import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Award, Users } from "lucide-react"

export default function AboutSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Quality Assured",
      description: "All our products meet the highest medical standards and certifications.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Fast Delivery",
      description: "We ensure quick delivery to healthcare facilities across the country.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Expert Support",
      description: "Our team of medical experts is available to provide guidance and support.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Trusted by Professionals",
      description: "Thousands of healthcare professionals rely on our products daily.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About MediCare</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MediCare is a leading provider of high-quality medical supplies and equipment. With over a decade of
            experience, we serve healthcare professionals with reliable products and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
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
