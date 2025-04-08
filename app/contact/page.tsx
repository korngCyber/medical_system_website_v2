"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      })

      setIsSubmitted(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setIsSubmitted(false)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch With Our Team</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our products or services? We're here to help. Reach out to us using the form below or
              through our contact information.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-background to-muted/50 border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Location</h3>
                <p className="text-muted-foreground">123 Medical Avenue</p>
                <p className="text-muted-foreground">Healthcare City, HC 12345</p>
                <p className="text-muted-foreground">United States</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/50 border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Phone</h3>
                <p className="text-muted-foreground">Main: +1 (555) 123-4567</p>
                <p className="text-muted-foreground">Support: +1 (555) 987-6543</p>
                <p className="text-muted-foreground">Fax: +1 (555) 765-4321</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/50 border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Email</h3>
                <p className="text-muted-foreground">info@medicare.com</p>
                <p className="text-muted-foreground">support@medicare.com</p>
                <p className="text-muted-foreground">sales@medicare.com</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/50 border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9AM - 6PM</p>
                <p className="text-muted-foreground">Saturday: 10AM - 4PM</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <Card className="border-none shadow-md bg-gradient-to-br from-background to-muted/50">
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-6">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your message has been sent successfully. We'll get back to you shortly.
                    </p>
                    <Button onClick={resetForm}>Send Another Message</Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-md bg-gradient-to-br from-background to-muted/50">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select value={formData.subject} onValueChange={handleSelectChange} required>
                            <SelectTrigger id="subject">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="support">Product Support</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
              <p className="text-muted-foreground mb-8">
                We're conveniently located in the heart of Healthcare City. Stop by during business hours to speak with
                our team in person.
              </p>

              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
                {/* In a real app, this would be a Google Maps embed */}
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-muted-foreground">
                      123 Medical Avenue, Healthcare City, HC 12345, United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4">FAQs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What are your shipping options?",
                  answer:
                    "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery for select areas. Free shipping is available for orders over $100.",
                },
                {
                  question: "Do you ship internationally?",
                  answer:
                    "Yes, we ship to over 50 countries worldwide. International shipping times and costs vary by location. Please contact our customer service for specific details about your region.",
                },
                {
                  question: "What is your return policy?",
                  answer:
                    "We accept returns within 30 days of purchase for most items in their original packaging. Some medical supplies cannot be returned due to health regulations. Please see our Returns page for full details.",
                },
                {
                  question: "Do you offer bulk discounts for healthcare facilities?",
                  answer:
                    "Yes, we offer special pricing for hospitals, clinics, and other healthcare facilities. Please contact our sales team to discuss your specific requirements and receive a customized quote.",
                },
                {
                  question: "How can I track my order?",
                  answer:
                    "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account on our website to view real-time updates on your order status.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to our newsletter to receive updates on new products, special offers, and healthcare insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
