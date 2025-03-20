"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="flex flex-col">
     

      {/* Contact Form and Info */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Get in Touch</h2>
              <p className="mb-8 text-muted-foreground">
                We'd love to hear from you. Fill out the form below and our team will get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Booking Inquiry"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>

            <div>
              <div className="mb-8 rounded-xl bg-muted/30 p-6">
                <h3 className="mb-4 text-xl font-bold">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">123 Cinema Street, Movie City, MC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@yovanAV.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-xl bg-muted/30 p-6">
                <h3 className="mb-4 text-xl font-bold">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span>10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday - Saturday</span>
                    <span>10:00 AM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>12:00 PM - 10:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] overflow-hidden rounded-xl">
                <Image src="/placeholder.svg?height=600&width=800" alt="Map Location" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button variant="outline" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                    View on Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Find answers to common questions about our services and booking process.
            </p>
          </div>
          <div className="mx-auto max-w-3xl divide-y rounded-xl bg-white shadow-lg">
            {[
              {
                question: "How far in advance should I book?",
                answer:
                  "We recommend booking at least 2 weeks in advance for weekends and special occasions. Weekday bookings can often be accommodated with less notice.",
              },
              {
                question: "Can I bring my own food and drinks?",
                answer:
                  "Yes, you're welcome to bring your own food and non-alcoholic beverages. We also offer concession packages that can be added to your booking.",
              },
              {
                question: "What content can I watch?",
                answer:
                  "You can bring your own content on USB or connect your streaming accounts. We also have a library of licensed films available for your selection.",
              },
              {
                question: "Is there a minimum booking time?",
                answer: "Yes, our minimum booking duration is 2 hours for all theatre spaces.",
              },
              {
                question: "Do you offer gift cards?",
                answer:
                  "Yes, we offer gift cards in various denominations that can be used toward any booking or concession purchase.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="mb-2 text-lg font-medium">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

