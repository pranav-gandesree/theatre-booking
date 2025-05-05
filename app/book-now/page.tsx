"use client"

import { useState, useEffect } from "react"
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
import main from "../../public/main.jpg"
import { useRouter } from "next/navigation"
import { GetBookingsByDate } from "@/actions/GetBookings"


export default function BookNowPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<{ [key: number]: string | null }>({});
  const router = useRouter()
  const [screens, setScreens] = useState<Screen[]>([])
  const [bookedSlots, setBookedSlots] = useState<Array<{ screen: string, time_slots: string, date: string }>>([]);

  useEffect(()=>{
    if (selectedDate) {
      const fetchBookings = async () => {
        const result = await GetBookingsByDate(selectedDate);
      
        if (result.error) {
          console.error('Failed to fetch:', result.error);
        } else {
          setBookedSlots(result.bookings || []);
          console.log('Bookings that are booked are ', result.bookings);
        }
      };
      
      fetchBookings();
    }

  
  }, [selectedDate])


  
  interface Screen {
    id: number
    name: string
    capacity: number
    price: number
    time_slots: (string | { start_time: string; end_time: string })[]
    availability?: Record<string, number>
    description?: string
  }

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await fetch("/api/screens")
        if (!response.ok) {
          throw new Error("Failed to fetch screens")
        }
        const result = await response.json()

        const data = Array.isArray(result) ? result : result.screens
        setScreens(data)
      } catch (error) {
        console.error("Error fetching screens:", error)
      }
    }

    fetchScreens()
  }, [])


  const handleSelectSlot = (screenId: number, slot: string) => {
    setSelectedSlots({ [screenId]: slot });
  };

  
  const handleBooking = (screenId: number) => {
    const timeSlot = selectedSlots[screenId];
    if (!timeSlot || !selectedDate) return;

    console.log(`Booking screen ${screenId} at ${timeSlot} on ${format(selectedDate, "yyyy-MM-dd")}`);
    
    router.push(`/screen/${screenId}/booking-form?time=${encodeURIComponent(timeSlot)}&date=${encodeURIComponent(format(selectedDate, "yyyy-MM-dd"))}&price=${screens[screenId - 1].price}`);
  };



  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image src={main} alt="Book yovanAV" fill className="object-cover brightness-[0.6]" priority />
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

            {/* Date Selector */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="mb-4 flex items-center gap-2">
                <Label>Select Date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => setSelectedDate(date)}
                      initialFocus
                      disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Screens List */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {screens.map((screen) => (
                  <ScreenCard
                    key={screen.id}
                    screen={screen}
                    timeSlots={screen.time_slots.map((slot) => (typeof slot === "string" ? slot : `${slot.start_time} - ${slot.end_time}`))}
                    selectedSlot={selectedSlots[screen.id] || null}
                    onSelectSlot={(slot) => handleSelectSlot(screen.id, slot)}
                    onBook={() => handleBooking(screen.id)}
                    selectedDate={selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Select a date"}
                    bookedSlots={bookedSlots}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium leading-none">{children}</span>
}

function formatTimeRange(slot: string) {
  const [start, end] = slot.split(" - "); // Split start and end times
  return `${formatTime(start)} - ${formatTime(end)}`;
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0/12 to 12
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

function ScreenCard({
  screen,
  timeSlots,
  selectedSlot,
  onSelectSlot,
  onBook,
  selectedDate,
  bookedSlots,
}: {
  screen: any;
  timeSlots: string[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  onBook: () => void;
  selectedDate: string;
  bookedSlots: Array<{ screen: string, time_slots: string, date: string }>;
}) {
  const isSlotBooked = (slot: string) => {
    return bookedSlots.some(booking => 
      booking.screen.toLowerCase() === screen.name.toLowerCase() && 
      booking.time_slots === slot
    );
  };

  const isPastSlot = (slot: string) => {
    // Only check for today's date
    const today = new Date();
    const selectedDateObj = new Date(selectedDate);
    
    if (selectedDateObj.toDateString() !== today.toDateString()) {
      return false;
    }

    const [, endTime] = slot.split(" - ");
    const [hours, minutes] = endTime.split(":").map(Number);
    const slotEndTime = new Date();
    slotEndTime.setHours(hours, minutes, 0, 0);

    return today > slotEndTime;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Screen {screen.id} - {screen.name}</CardTitle>
            <CardDescription className="mt-1">{screen.description}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">₹{screen.price}</Badge>
        </div>
        <div>Max {screen.capacity} people</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">Available Slots for {selectedDate}:</div>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const available = screen.availability?.[slot] ?? 8;
              const isSelected = selectedSlot === slot;
              const isBooked = isSlotBooked(slot);
              const isPast = isPastSlot(slot);

              return (
                <div
                  key={slot}
                  className={`p-2 rounded-md border text-center ${
                    isBooked || available === 0 || isPast
                      ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                      : isSelected
                      ? "bg-primary text-white border-primary"
                      : "hover:border-primary cursor-pointer"
                  }`}
                  onClick={() => !isBooked && !isPast && available > 0 && onSelectSlot(slot)}
                >
                  <div className="text-sm font-medium">{formatTimeRange(slot)}</div>
                  {isBooked && (
                    <div className="text-xs text-red-500 mt-1">Already Booked</div>
                  )}
                  {isPast && !isBooked && (
                    <div className="text-xs text-gray-500 mt-1">Time Passed</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onBook} disabled={!selectedSlot || selectedDate === "Select a date"}>
          Book Now - ₹{screen.price}
        </Button>
      </CardFooter>
    </Card>
  );
}