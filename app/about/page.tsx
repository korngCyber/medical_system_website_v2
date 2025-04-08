import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { HeartPulse, Globe, Sparkles } from "lucide-react"

export const metadata = {
  title: "About Us - MediCare",
  description: "Learn about MediCare's mission, values, and team",
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-20 pb-16">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Revolutionizing Healthcare Through Quality Medical Supplies
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Since 2010, MediCare has been at the forefront of providing high-quality medical supplies to healthcare
                professionals and institutions worldwide. Our mission is to improve patient care through reliable,
                innovative products.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg">Explore Products</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 rounded-lg" />
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Medical professionals"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">12+</p>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">5000+</p>
              <p className="text-muted-foreground">Healthcare Partners</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">10M+</p>
              <p className="text-muted-foreground">Products Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">Our Story</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">From a Small Clinic to Global Healthcare Partner</h2>
            <p className="text-lg text-muted-foreground">
              What started as a small operation to supply local clinics has grown into a global enterprise dedicated to
              improving healthcare outcomes worldwide.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full" />

            {/* Timeline items */}
            <div className="space-y-24 relative">
              {/* 2010 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="md:text-right md:pr-12">
                  <Badge variant="outline" className="mb-2 md:ml-auto">
                    2010
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3">The Beginning</h3>
                  <p className="text-muted-foreground">
                    MediCare was founded by Dr. James Wilson with a mission to provide quality medical supplies to local
                    clinics at affordable prices.
                  </p>
                </div>
                <div className="hidden md:block" />
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background" />
              </div>

              {/* 2015 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="hidden md:block" />
                <div className="md:pl-12">
                  <Badge variant="outline" className="mb-2">
                    2015
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3">National Expansion</h3>
                  <p className="text-muted-foreground">
                    After rapid growth, MediCare expanded operations nationwide, establishing distribution centers in
                    major cities and serving thousands of healthcare facilities.
                  </p>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background" />
              </div>

              {/* 2018 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="md:text-right md:pr-12">
                  <Badge variant="outline" className="mb-2 md:ml-auto">
                    2018
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3">International Reach</h3>
                  <p className="text-muted-foreground">
                    MediCare went global, establishing partnerships with international healthcare providers and
                    expanding our product line to meet diverse needs.
                  </p>
                </div>
                <div className="hidden md:block" />
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background" />
              </div>

              {/* Today */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="hidden md:block" />
                <div className="md:pl-12">
                  <Badge variant="outline" className="mb-2">
                    Today
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3">Innovation Leader</h3>
                  <p className="text-muted-foreground">
                    Today, MediCare is recognized as an industry leader, continuously innovating and setting new
                    standards for quality and service in medical supplies.
                  </p>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Principles That Guide Us</h2>
            <p className="text-lg text-muted-foreground">
              At MediCare, our core values shape everything we do, from product development to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-background to-muted/50 border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <HeartPulse className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every product we offer undergoes rigorous testing to ensure it meets
                  the highest standards of safety and effectiveness.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/50 border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously seek new ways to improve healthcare outcomes through innovative products and solutions
                  that address evolving medical needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/50 border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Impact</h3>
                <p className="text-muted-foreground">
                  We're committed to making healthcare more accessible worldwide, partnering with organizations to bring
                  quality medical supplies to underserved regions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the Experts Behind MediCare</h2>
            <p className="text-lg text-muted-foreground">
              Our diverse team of healthcare professionals, engineers, and business experts work together to deliver
              exceptional products and services.
            </p>
          </div>

          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="medical">Medical Advisors</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>
            <TabsContent value="leadership">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Dr. James Wilson",
                    role: "Founder & CEO",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Former surgeon with 20+ years of experience in healthcare management.",
                  },
                  {
                    name: "Sarah Chen",
                    role: "Chief Operations Officer",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Supply chain expert who has transformed our global distribution network.",
                  },
                  {
                    name: "Michael Rodriguez",
                    role: "Chief Innovation Officer",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Biomedical engineer focused on developing next-generation medical supplies.",
                  },
                ].map((member, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-md">
                    <div className="aspect-square relative">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="medical">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Dr. Emily Johnson",
                    role: "Chief Medical Advisor",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Cardiologist with expertise in medical device evaluation and safety protocols.",
                  },
                  {
                    name: "Dr. Robert Kim",
                    role: "Research Director",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Leads our research initiatives to identify emerging healthcare needs and solutions.",
                  },
                  {
                    name: "Dr. Aisha Patel",
                    role: "Quality Assurance",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Ensures all products meet rigorous medical standards and regulatory requirements.",
                  },
                ].map((member, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-md">
                    <div className="aspect-square relative">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="operations">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "David Thompson",
                    role: "Global Supply Chain Director",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Manages our worldwide logistics network to ensure timely product delivery.",
                  },
                  {
                    name: "Lisa Wong",
                    role: "Customer Relations Manager",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Leads our customer support team with a focus on exceptional service.",
                  },
                  {
                    name: "Carlos Mendez",
                    role: "Production Manager",
                    image: "/placeholder.svg?height=400&width=400",
                    bio: "Oversees manufacturing processes to maintain quality and efficiency.",
                  },
                ].map((member, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-md">
                    <div className="aspect-square relative">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission to Improve Healthcare</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a healthcare provider, distributor, or potential team member, we'd love to connect with
              you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
