"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Film, Volume2, Monitor, Clock, Users, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function BookNowPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Generate time slots with 4-hour gaps (6am to 10pm)
  const timeSlots = ["06:00 AM", "10:00 AM", "02:00 PM", "06:00 PM", "10:00 PM"]

  // Screen data
  const screens = [
    {
      id: 1,
      name: "Screen 1 - Action",
      description: "Perfect for action movies with immersive sound",
      price: 199,
      availability: {
        "06:00 AM": 8,
        "10:00 AM": 5,
        "02:00 PM": 2,
        "06:00 PM": 0,
        "10:00 PM": 8,
      },
    },
    {
      id: 2,
      name: "Screen 2 - Romance",
      description: "Intimate setting ideal for date nights",
      price: 219,
      availability: {
        "06:00 AM": 8,
        "10:00 AM": 6,
        "02:00 PM": 4,
        "06:00 PM": 1,
        "10:00 PM": 7,
      },
    },
    {
      id: 3,
      name: "Screen 3 - Family",
      description: "Kid-friendly environment for family movies",
      price: 229,
      availability: {
        "06:00 AM": 7,
        "10:00 AM": 3,
        "02:00 PM": 0,
        "06:00 PM": 2,
        "10:00 PM": 8,
      },
    },
    {
      id: 4,
      name: "Screen 4 - Horror",
      description: "Dark atmosphere perfect for scary movies",
      price: 239,
      availability: {
        "06:00 AM": 8,
        "10:00 AM": 8,
        "02:00 PM": 6,
        "06:00 PM": 3,
        "10:00 PM": 4,
      },
    },
    {
      id: 5,
      name: "Screen 5 - Sci-Fi",
      description: "Futuristic setting for sci-fi enthusiasts",
      price: 249,
      availability: {
        "06:00 AM": 8,
        "10:00 AM": 7,
        "02:00 PM": 5,
        "06:00 PM": 0,
        "10:00 PM": 2,
      },
    },
    {
      id: 6,
      name: "Screen 6 - Classic",
      description: "Vintage cinema feel for classic movie lovers",
      price: 259,
      availability: {
        "06:00 AM": 6,
        "10:00 AM": 4,
        "02:00 PM": 8,
        "06:00 PM": 5,
        "10:00 PM": 3,
      },
    },
    {
      id: 7,
      name: "Screen 7 - Premium",
      description: "Our most luxurious theatre experience",
      price: 299,
      availability: {
        "06:00 AM": 8,
        "10:00 AM": 8,
        "02:00 PM": 7,
        "06:00 PM": 4,
        "10:00 PM": 1,
      },
    },
  ]

  const handleBooking = (screenId: number, timeSlot: string) => {
    alert(
      `Booking confirmed for Screen ${screenId} at ${timeSlot} on ${date ? format(date, "MMMM dd, yyyy") : "today"}`,
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="Book yovanAV"
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
            Choose from our 7 premium screens for your private cinema experience.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Available Screens</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Each screen has a capacity of 8 people and features Dolby Atmos sound and a 120-inch 4K screen.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="mb-4 flex items-center gap-2">
                <Label>Select Date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mx-auto flex justify-center">
              <TabsTrigger value="all">All Screens</TabsTrigger>
              <TabsTrigger value="available">Available Now</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {screens.map((screen) => (
                  <ScreenCard
                    key={screen.id}
                    screen={screen}
                    timeSlots={timeSlots}
                    onBook={handleBooking}
                    selectedDate={date ? format(date, "MMMM dd, yyyy") : "today"}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="available" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {screens
                  .filter((screen) => Object.values(screen.availability).some((avail) => avail > 0))
                  .map((screen) => (
                    <ScreenCard
                      key={screen.id}
                      screen={screen}
                      timeSlots={timeSlots}
                      onBook={handleBooking}
                      selectedDate={date ? format(date, "MMMM dd, yyyy") : "today"}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="premium" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {screens
                  .filter((screen) => screen.price >= 249)
                  .map((screen) => (
                    <ScreenCard
                      key={screen.id}
                      screen={screen}
                      timeSlots={timeSlots}
                      onBook={handleBooking}
                      selectedDate={date ? format(date, "MMMM dd, yyyy") : "today"}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 rounded-xl bg-muted/30 p-6">
            <h3 className="mb-4 text-xl font-bold">Booking Information</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <Users className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">Each screen accommodates up to 8 people</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Volume2 className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Sound System</p>
                  <p className="text-sm text-muted-foreground">Dolby Atmos immersive sound experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Monitor className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Screen</p>
                  <p className="text-sm text-muted-foreground">120-inch 4K Ultra HD screen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Refund Policy</p>
                  <p className="text-sm text-muted-foreground">Full refund if cancelled 72+ hours before showtime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


  
    </div>
  )
}

// Label component
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </span>
  )
}

// Screen Card Component
function ScreenCard({
  screen,
  timeSlots,
  onBook,
  selectedDate,
}: {
  screen: any
  timeSlots: string[]
  onBook: (screenId: number, timeSlot: string) => void
  selectedDate: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{screen.name}</CardTitle>
            <CardDescription className="mt-1">{screen.description}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            ${screen.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-primary" />
            <span className="text-sm">120-inch 4K screen</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-primary" />
            <span className="text-sm">Dolby Atmos sound</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm">Capacity: 8 people</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-sm">Refund eligible 72hrs before</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Available Slots for {selectedDate}:</h4>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const available = screen.availability[slot]
              return (
                <div
                  key={slot}
                  className={`p-2 rounded-md border text-center ${
                    available === 0
                      ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                      : "hover:border-primary cursor-pointer"
                  }`}
                >
                  <div className="text-sm font-medium">{slot}</div>
                  <div className="text-xs text-muted-foreground">
                    {available === 0 ? "Fully Booked" : `${available} of 8 available`}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onBook(screen.id, timeSlots.find((slot) => screen.availability[slot] > 0) || "")}
          disabled={Object.values(screen.availability).every((avail) => avail === 0)}
        >
          Book Now - ${screen.price}
        </Button>
      </CardFooter>
    </Card>
  )
}

