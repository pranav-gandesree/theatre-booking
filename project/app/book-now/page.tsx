"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function BookNowPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined)
  const [selectedTheatre, setSelectedTheatre] = useState<string | undefined>(undefined)
  const [guests, setGuests] = useState<string>("2")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    console.log("Booking submitted:", {
      ...formData,
      date,
      package: selectedPackage,
      theatre: selectedTheatre,
      guests,
    })
    alert("Thank you for your booking request! We'll confirm your reservation shortly.")
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="Book CineSuite"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="container relative z-10 flex h-full flex-col justify-center px-4 sm:px-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Book Your Experience
          </h1>
          <p className="max-w-xl text-lg text-white/90">
            Reserve your private cinema experience in just a few simple steps.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Reserve Your Theatre</h2>
              <p className="mb-8 text-muted-foreground">
                Complete the form below to request your booking. Our team will confirm availability and details within
                24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Select Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Hours</SelectItem>
                      <SelectItem value="3">3 Hours</SelectItem>
                      <SelectItem value="4">4 Hours</SelectItem>
                      <SelectItem value="5">5 Hours</SelectItem>
                      <SelectItem value="custom">Custom Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3-5">3-5 Guests</SelectItem>
                      <SelectItem value="6-10">6-10 Guests</SelectItem>
                      <SelectItem value="11-15">11-15 Guests</SelectItem>
                      <SelectItem value="16+">16+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Select Theatre Type</Label>
                  <RadioGroup value={selectedTheatre} onValueChange={setSelectedTheatre}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="relative rounded-lg border p-4 hover:border-primary">
                        <RadioGroupItem value="standard" id="standard" className="absolute right-4 top-4" />
                        <Label htmlFor="standard" className="font-medium">
                          Standard Theatre
                        </Label>
                        <p className="text-sm text-muted-foreground">Up to 10 guests, 4K projection</p>
                        <p className="mt-1 text-sm font-medium">$150/hour</p>
                      </div>
                      <div className="relative rounded-lg border p-4 hover:border-primary">
                        <RadioGroupItem value="premium" id="premium" className="absolute right-4 top-4" />
                        <Label htmlFor="premium" className="font-medium">
                          Premium Theatre
                        </Label>
                        <p className="text-sm text-muted-foreground">Up to 15 guests, 4K with Dolby Atmos</p>
                        <p className="mt-1 text-sm font-medium">$250/hour</p>
                      </div>
                      <div className="relative rounded-lg border p-4 hover:border-primary">
                        <RadioGroupItem value="vip" id="vip" className="absolute right-4 top-4" />
                        <Label htmlFor="vip" className="font-medium">
                          VIP Suite
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Up to 8 guests, luxury recliners, private lounge
                        </p>
                        <p className="mt-1 text-sm font-medium">$350/hour</p>
                      </div>
                      <div className="relative rounded-lg border p-4 hover:border-primary">
                        <RadioGroupItem value="party" id="party" className="absolute right-4 top-4" />
                        <Label htmlFor="party" className="font-medium">
                          Party Room
                        </Label>
                        <p className="text-sm text-muted-foreground">Up to 20 guests, large screen, party setup</p>
                        <p className="mt-1 text-sm font-medium">$400/hour</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label>Select Package</Label>
                  <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                    <div className="grid gap-4">
                      <div className="relative rounded-lg border p-4 hover:border-primary">
                        <RadioGroupItem value="basic" id="basic" className="absolute right-4 top-4" />
                        <Label htmlFor="basic" className="font-medium">
                          Basic Package
                        </Label>
                        <p className="text-sm text-muted-foreground">Theatre rental only</p>
                        <p className="mt-1 text-sm font-medium">No additional cost</p>
                      </div>
                      <div className="relative rounded-lg border p-4 hover:border-primary">
                        <RadioGroupItem value="concession" id="concession" className="absolute right-4 top-4" />
                        <Label htmlFor="concession" className="font-medium">
                          Concession Package
                        </Label>
                        <p className="text-sm text-muted-foreground">Popcorn, soft drinks, and candy for all guests</p>
                        <p className="mt-1 text-sm font-medium">+$15 per guest</p>
                      </div>
                      <div className="relative rounded-lg border p-4 hover:border-primary">
                        <RadioGroupItem value="celebration" id="celebration" className="absolute right-4 top-4" />
                        <Label htmlFor="celebration" className="font-medium">
                          Celebration Package
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Concessions, decorations, and a custom welcome message
                        </p>
                        <p className="mt-1 text-sm font-medium">+$25 per guest</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(123) 456-7890"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    placeholder="Any special requests or additional information..."
                    rows={4}
                    value={formData.specialRequests}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Request Booking
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-xl bg-muted/30 p-6">
                <h3 className="mb-4 text-xl font-bold">Why Book with CineSuite?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Premium Experience</p>
                      <p className="text-sm text-muted-foreground">
                        State-of-the-art audio and visual equipment for an immersive experience.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Complete Privacy</p>
                      <p className="text-sm text-muted-foreground">
                        Exclusive use of the theatre for you and your guests only.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Customizable Experience</p>
                      <p className="text-sm text-muted-foreground">
                        Choose your content, adjust lighting, and personalize your experience.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Dedicated Support</p>
                      <p className="text-sm text-muted-foreground">
                        Our staff is available to assist you throughout your booking.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Theatre Interior"
                  width={1200}
                  height={800}
                  className="w-full object-cover"
                />
              </div>

              <div className="rounded-xl bg-muted/30 p-6">
                <h3 className="mb-4 text-xl font-bold">Booking Policies</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Deposit:</span> A 50% deposit is required to confirm
                    your booking.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Cancellation:</span> Full refund if cancelled 72+
                    hours in advance. 50% refund if cancelled 24-72 hours in advance. No refund for cancellations less
                    than 24 hours in advance.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Changes:</span> Booking changes are subject to
                    availability and must be requested at least 48 hours in advance.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Content:</span> All content must comply with copyright
                    laws and our content policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Don't just take our word for it. Here's what people are saying about their experience with us.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center space-x-2">
                <div className="h-2 w-16 rounded bg-primary"></div>
                <div className="h-2 w-4 rounded bg-primary/50"></div>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "We celebrated our anniversary here and it was magical. The sound quality and screen size made us feel
                like we were in our own private cinema!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="font-medium">Sarah & Michael</p>
                  <p className="text-sm text-muted-foreground">Anniversary Celebration</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center space-x-2">
                <div className="h-2 w-16 rounded bg-primary"></div>
                <div className="h-2 w-4 rounded bg-primary/50"></div>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "My son's birthday party was a hit! All the kids loved watching their favorite movie on the big screen
                with surround sound."
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="font-medium">David Thompson</p>
                  <p className="text-sm text-muted-foreground">Birthday Party</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center space-x-2">
                <div className="h-2 w-16 rounded bg-primary"></div>
                <div className="h-2 w-4 rounded bg-primary/50"></div>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "We hosted a corporate event here and it exceeded our expectations. The staff was professional and the
                setup was perfect."
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="font-medium">Jennifer Lee</p>
                  <p className="text-sm text-muted-foreground">Corporate Event</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Theatre Background"
            fill
            className="object-cover brightness-[0.3]"
          />
        </div>
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Questions About Booking?</h2>
            <p className="mb-8 text-lg text-white/80">
              Our team is ready to help you plan the perfect cinema experience. Contact us for personalized assistance.
            </p>
            <Button size="lg" variant="outline" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

