"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Film } from "lucide-react";
import { GetBookingsByNumber } from "@/actions/GetBookings"
import { toast } from "@/components/ui/use-toast";


export default function MyBookingsPage() {
  const [bookingNumber, setBookingNumber] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [bookings, setBookings] = useState<any[]>([])

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault()
    const fetchedBookings = await GetBookingsByNumber(bookingNumber);
    console.log("fetched bookings areeeeeee",fetchedBookings)
    if (fetchedBookings && fetchedBookings.length > 0) {
      setBookings(fetchedBookings);
      setIsLoggedIn(true);

      toast({
        title: "🎉 Booking Confirmed",
        description: "Your booking has been saved successfully.",
        variant: "default",
      });

    } else {
      alert("No bookings found for this number");
    }
  }

  // Filter bookings into upcoming and past
  const currentDate = new Date();
  const upcomingBookings = bookings.filter(booking => new Date(booking.date) >= currentDate);
  const pastBookings = bookings.filter(booking => new Date(booking.date) < currentDate);

  const formatAddOns = (addOns: string[]) => {
    return addOns?.join(", ") || "No add-ons";
  };

  const formatCakes = (cakes: string[]) => {
    return cakes?.join(", ") || "No cakes selected";
  };




const BookingCard = ({ booking }: { booking: any }) => {
  return (
    <div key={booking.id} className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-3">
          <Film className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">{booking.booking_name}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            booking.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Date & Time */}
      <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          {new Date(booking.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          {booking.time_slots || "Time slot not specified"}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm">
        <div>
          <span className="font-medium text-muted-foreground">Screen: </span>
          <span className="capitalize font-semibold">{booking.screen}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="font-medium text-muted-foreground">Occasion: </span>
            <span className="capitalize">{booking.occasion || "—"}</span>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Total Persons: </span>
            {booking.total_persons}
          </div>

          <div>
            <span className="font-medium text-muted-foreground">Cakes: </span>
            {formatCakes(booking.cake) || "—"}
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Add-ons: </span>
            {formatAddOns(booking.add_ons) || "—"}
          </div>

          <div className="sm:col-span-2">
            <span className="font-medium text-muted-foreground">Email: </span>
            {booking.email_id}
          </div>
        </div>
      </div>

      {/* Footer badges */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Total Price: ₹{booking.total_price}
        </span>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
          Balance: ₹{booking.balance_amount}
        </span>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          Booking ID: {booking.number}
        </span>
      </div>
    </div>
  );
};



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
                  Enter your booking number to view your reservation details.
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bookingNumber">Phone Number</Label>
                  <Input
                    id="bookingNumber"
                    placeholder="Phone number"
                    required
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value)}
                  />
                </div>
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
                  View and manage your bookings with yovanAV.
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
                        <BookingCard key={booking.id} booking={booking} />
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
                        <BookingCard key={booking.id} booking={booking} />
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
