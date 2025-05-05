"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Film, MapPin } from "lucide-react"
import { getBookings } from "@/actions/GetBookings"

export default function MyBookingsPage() {
  const [email, setEmail] = useState("")
  // const [bookingId, setBookingId] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would verify credentials here
    const bookings = await getBookings(email);
    console.log(bookings);
    setIsLoggedIn(true)
  }

  // Sample booking data for demonstration
  const upcomingBookings = [
    {
      id: "BK-12345",
      date: "March 25, 2025",
      time: "6:00 PM - 9:00 PM",
      theatre: "Premium Theatre",
      package: "Celebration Package",
      guests: "6 guests",
      status: "Confirmed",
    },
  ]

  const pastBookings = [
    {
      id: "BK-12344",
      date: "February 14, 2025",
      time: "7:00 PM - 10:00 PM",
      theatre: "VIP Suite",
      package: "Concession Package",
      guests: "2 guests",
      status: "Completed",
    },
    {
      id: "BK-12343",
      date: "January 20, 2025",
      time: "3:00 PM - 6:00 PM",
      theatre: "Standard Theatre",
      package: "Basic Package",
      guests: "8 guests",
      status: "Completed",
    },
  ]

  return (
    <div className="flex flex-col">
    

      {/* Bookings Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          {!isLoggedIn ? (
            <div className="mx-auto max-w-md">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Access Your Bookings</h2>
                <p className="text-muted-foreground">
                  Enter your email and booking ID to view your reservation details.
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="bookingId">Booking ID</Label>
                  <Input
                    id="bookingId"
                    placeholder="BK-12345"
                    required
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                  />
                </div> */}
                <Button type="submit" className="w-full">
                  View Bookings
                </Button>
              </form>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  Don't have a booking yet?{" "}
                  <Link href="/book-now" className="font-medium text-primary hover:underline">
                    Book now
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Your Bookings</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  View and manage your upcoming and past bookings with yovanAV.
                </p>
              </div>

              <Tabs defaultValue="upcoming" className="mx-auto max-w-4xl">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                  <TabsTrigger value="past">Past Bookings</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-6">
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-6">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="rounded-xl border bg-card p-6 shadow-sm">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <div className="mb-2 flex items-center">
                                <Film className="mr-2 h-5 w-5 text-primary" />
                                <h3 className="text-xl font-bold">{booking.theatre}</h3>
                                <span className="ml-3 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  {booking.status}
                                </span>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  <span>123 Cinema Street, Movie City</span>
                                </div>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                  {booking.package}
                                </span>
                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                  {booking.guests}
                                </span>
                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                  Booking ID: {booking.id}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 sm:items-end">
                              <Button variant="outline" size="sm">
                                Modify Booking
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-destructive text-destructive hover:bg-destructive/10"
                              >
                                Cancel Booking
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border bg-card p-8 text-center">
                      <Film className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-xl font-medium">No Upcoming Bookings</h3>
                      <p className="mt-2 text-muted-foreground">
                        You don't have any upcoming bookings. Ready to plan your next cinema experience?
                      </p>
                      <Button className="mt-6" asChild>
                        <Link href="/book-now">Book Now</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                  {pastBookings.length > 0 ? (
                    <div className="space-y-6">
                      {pastBookings.map((booking) => (
                        <div key={booking.id} className="rounded-xl border bg-card p-6 shadow-sm">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <div className="mb-2 flex items-center">
                                <Film className="mr-2 h-5 w-5 text-primary" />
                                <h3 className="text-xl font-bold">{booking.theatre}</h3>
                                <span className="ml-3 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                  {booking.status}
                                </span>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  <span>123 Cinema Street, Movie City</span>
                                </div>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                  {booking.package}
                                </span>
                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                  {booking.guests}
                                </span>
                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                  Booking ID: {booking.id}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 sm:items-end">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                Book Again
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border bg-card p-8 text-center">
                      <Film className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-xl font-medium">No Past Bookings</h3>
                      <p className="mt-2 text-muted-foreground">You don't have any past bookings with us yet.</p>
                      <Button className="mt-6" asChild>
                        <Link href="/book-now">Book Your First Experience</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Find answers to common questions about bookings and your account.
            </p>
          </div>
          <div className="mx-auto max-w-3xl divide-y rounded-xl bg-white shadow-lg">
            {[
              {
                question: "How do I modify my booking?",
                answer:
                  "You can modify your booking by logging in to your account and selecting the 'Modify Booking' option next to your reservation. Changes are subject to availability and must be made at least 48 hours before your scheduled time.",
              },
              {
                question: "What is your cancellation policy?",
                answer:
                  "We offer a full refund if you cancel at least 72 hours before your booking. Cancellations made 24-72 hours in advance receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations made less than 24 hours in advance.",
              },
              {
                question: "Can I share my booking with others?",
                answer:
                  "Yes, you can share your booking details with your guests. However, the person who made the booking must be present at check-in with a valid ID.",
              },
              {
                question: "What if I lose my booking ID?",
                answer:
                  "If you've lost your booking ID, please contact our customer support with your name, email, and the approximate date of your booking. We'll help you retrieve your booking information.",
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

