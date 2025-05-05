"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import BookingSummary from "@/components/booking-summary"
import Stepper from "@/components/booking/Stepper"
import UserDetails from "@/components/booking/UserDetails"
import OccasionSelector from "@/components/booking/OccasionSelector"
import CakeSelector from "@/components/booking/CakeSelector"
import AddonsSelector from "@/components/booking/AddonsSelector"
import BookingSummaryStep from "@/components/booking/BookingSummaryStep"
import ProgressIndicator from "@/components/booking/ProgressIndicator"
import { useData } from "@/context/DataContext"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast";



import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getScreenDetails } from "./action"

// Define interfaces for our data types
interface BookingData {
  id?: number
  created_at?: string
  booking_name: string
  total_persons: number
  email_id: string
  number: string
  occasion: string
  first_person_name: string
  second_person_name: string
  cake: string[]
  add_ons: string[]
  total_price: number
  screen: string
  date: string
  balance_amount: number
  time_slots: string
}

export default function BookingFormPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { cakes, addons } = useData()

  // Steps
  const steps = ["Customer Details", "Occasion", "Extras", "Summary"]
  const [currentStep, setCurrentStep] = useState<number>(1)

  // Booking data state
  const [bookingData, setBookingData] = useState<BookingData>({
    booking_name: "",
    total_persons: 1,
    email_id: "",
    number: "",
    occasion: "",
    first_person_name: "",
    second_person_name: "",
    cake: [],
    add_ons: [],
    total_price: searchParams.get('price') ? parseFloat(searchParams.get('price')!) : 0,
    screen: `Screen ${params.screennumber || 1}`,
    date: searchParams.get('date') || "",
    balance_amount: 0,
    time_slots: searchParams.get('time') || "",
  })

  // Form states for each step
  const [formData, setFormData] = useState<{
    name: string
    persons: string
    number: string
    email: string
    wantDecoration: string
  }>({
    name: "",
    persons: "1",
    number: "",
    email: "",
    wantDecoration: "",
  })

  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const [occasionNames, setOccasionNames] = useState<string[]>(["", ""])
  const [selectedCakes, setSelectedCakes] = useState<string[]>([])
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [screenDetails, setScreenDetails] = useState<{ name: string; capacity: number } | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);

  // Load initial URL/session data
  useEffect(() => {
    const time = searchParams.get('time')
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
    const screenId = params.screennumber as string
    const price = searchParams.get('price') ? parseFloat(searchParams.get('price')!) : 0

    // First fetch screen details
    const fetchScreenDetails = async () => {
      console.log("screen id is", screenId)
      const { screen } = await getScreenDetails(screenId);
      console.log("screen details are", screen)

      if (screen) {
        setScreenDetails(screen);
        console.log("screen details areinside", screenDetails)

        const initialBookingData: BookingData = {
          booking_name: "",
          total_persons: 1,
          email_id: "",
          number: "",
          occasion: "",
          first_person_name: "",
          second_person_name: "",
          cake: [],
          add_ons: [],
          total_price: price,
          screen: screen.name, // Use actual screen name from DB
          date: date,
          balance_amount: 0,
          time_slots: time || "",
        }

        const stored = sessionStorage.getItem("bookingData")
        if (stored) {
          const parsed = JSON.parse(stored) as BookingData
          if (
            parsed.screen === screen.name &&
            parsed.time_slots === time &&
            parsed.date === date
          ) {
            setBookingData(parsed)
            setFormData({
              name: parsed.first_person_name,
              persons: parsed.total_persons.toString(),
              email: parsed.email_id,
              number: parsed.number,
              wantDecoration: "",
            })
            if (parsed.occasion) setSelectedOccasion(parsed.occasion)
            if (parsed.first_person_name || parsed.second_person_name) {
              setOccasionNames([parsed.first_person_name, parsed.second_person_name])
            }
            if (Array.isArray(parsed.cake)) setSelectedCakes(parsed.cake.map(String))
            if (Array.isArray(parsed.add_ons)) setSelectedAddons(parsed.add_ons.map(String))
            return
          }
        }

        setBookingData(initialBookingData)
        sessionStorage.setItem("bookingData", JSON.stringify(initialBookingData))
      }
    }

    fetchScreenDetails();
  }, [params.screennumber, searchParams])


  


  // Generate persons options based on screen capacity
  const personsOptions = screenDetails?.capacity 
    ? Array.from({ length: screenDetails.capacity }, (_, i) => i + 1)
    : [1];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOccasionSelect = (occId: string) => { setSelectedOccasion(occId) }
  const handleNameChange = (i: number, v: string) => {
    const arr = [...occasionNames]; arr[i] = v; setOccasionNames(arr)
  }
  const handleCakeSelect = (cakeName: string) =>
    setSelectedCakes((prev) =>
      prev.includes(cakeName) ? prev.filter((x) => x !== cakeName) : [...prev, cakeName]
    )
  const handleAddonToggle = (addonName: string) =>
    setSelectedAddons((prev) =>
      prev.includes(addonName) ? prev.filter((x) => x !== addonName) : [...prev, addonName]
    )
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTermsAccepted(e.target.checked)

  const goToNext = () => { saveCurrentStepData(); setCurrentStep((s) => s + 1) }
  const goToPrev = () => setCurrentStep((s) => s - 1)

  const saveCurrentStepData = () => {
    let updated = { ...bookingData }
    if (currentStep === 1) {
      updated.first_person_name = formData.name
      updated.total_persons = parseInt(formData.persons)
      updated.email_id = formData.email
      updated.number = formData.number
    } else if (currentStep === 2) {
      const occObj = occasions.find((o) => o.id === selectedOccasion)
      const names = occObj
        ? occasionNames.slice(0, occObj.requiresNames).filter((n) => n.trim())
        : []
      updated.occasion = selectedOccasion || ""
      updated.first_person_name = names[0] || ""
      updated.second_person_name = names[1] || ""
    } else if (currentStep === 3) {
      const basePrice = searchParams.get('price') ? parseFloat(searchParams.get('price')!) : 0
      const cakesAmt = cakes.filter(c => selectedCakes.includes(c.name)).reduce((sum, c) => sum + c.price, 0)
      const addonsAmt = addons.filter(a => selectedAddons.includes(a.name)).reduce((sum, a) => sum + a.price, 0)
      const total = basePrice + cakesAmt + addonsAmt
      const balance = total - 1000
      updated = {
        ...updated,
        cake: selectedCakes,
        add_ons: selectedAddons,
        total_price: total,
        balance_amount: balance,
      }
    }
    setBookingData(updated)
    sessionStorage.setItem("bookingData", JSON.stringify(updated))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    saveCurrentStepData()
    try {
      const payload = {
        ...bookingData,
        booking_name: formData.name,
        total_persons: parseInt(formData.persons),
        email_id: formData.email,
        number: formData.number,
        occasion: selectedOccasion || "",
        first_person_name: occasionNames[0] || "",
        second_person_name: occasionNames[1] || "",
        cake: selectedCakes,
        add_ons: selectedAddons,
        date: bookingData.date,
        time_slots: bookingData.time_slots,
        total_price: bookingData.total_price,
        balance_amount: bookingData.balance_amount,
      }
      console.log("payload from payloadisfrom creatingg",payload)

      const { error } = await supabase.from("bookings").insert([payload])
      if (error) throw error
      sessionStorage.removeItem("bookingData")
      toast({
        title: "🎉 Booking Confirmed",
        description: "Your booking has been saved successfully.",
        variant: "default",
      });
      router.push("/")

    } catch (err) {
      console.error(err)
      toast({
        title: "❌ Booking Failed",
        description: "There was an error saving your booking. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleBack = () => router.push("/book-now")

  // Utility & validation
  const formatDate = (ds: string) => {
    if (!ds) return ""
    const d = new Date(ds)
    return d.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    })
  }

  const isStepValid = () => {
    if (currentStep === 1)
      return !!(formData.name && formData.persons && formData.email && formData.number)
    if (currentStep === 2) {
      if (!selectedOccasion) return false
      const req = occasions.find((o) => o.id === selectedOccasion)?.requiresNames || 0
      return occasionNames.slice(0, req).every((n) => n.trim())
    }
    if (currentStep === 4) return termsAccepted
    return true
  }

  const hasReq = bookingData.screen && bookingData.date && bookingData.time_slots
  if (!hasReq) {
    return (
      <div className="container text-center py-8">
        <h1 className="text-2xl font-bold">Missing Booking Information</h1>
        <p>Please select a screen, date, and time slot first.</p>
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Return
        </Button>
      </div>
    )
  }

  const occasions = [
    { id: "birthday", name: "Birthday Celebration", requiresNames: 1 },
    { id: "anniversary", name: "Wedding Anniversary", requiresNames: 2 },
    { id: "other", name: "Other Celebration", requiresNames: 0 },
  ]
  const selectedOccObj = occasions.find((o) => o.id === selectedOccasion)
  const selCake = cakes.find((c) => selectedCakes.includes(c.name))
  const selAddons = addons.filter((a) => selectedAddons.includes(a.name))

  // Update the UserDetails component to use Select for persons
  const renderPersonsSelect = () => (
    <div className="space-y-2">
      <label htmlFor="persons" className="text-sm font-medium">
        Number of Persons
      </label>
      <Select
        name="persons"
        value={formData.persons}
        onValueChange={(value) => setFormData(prev => ({ ...prev, persons: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select number of persons" />
        </SelectTrigger>
        <SelectContent>
          {personsOptions.map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} {num === 1 ? 'Person' : 'Persons'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const handleSelectChange = (name: string, value: string) => {
    if (name === "persons") {
      setFormData(prev => ({ ...prev, persons: value }));
    } else if (name === "time_slots") {
      setBookingData(prev => ({ ...prev, time_slots: value }));
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserDetails
            bookingData={bookingData}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            personsOptions={personsOptions}
            availableTimeSlots={availableTimeSlots}
          />
        )
      case 2:
        return (
          <OccasionSelector
            selectedOccasion={selectedOccasion}
            occasionNames={occasionNames}
            handleOccasionSelect={handleOccasionSelect}
            handleNameChange={handleNameChange}
          />
        )
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Extras</h2>
            <CakeSelector selectedCakes={selectedCakes} handleCakeSelect={handleCakeSelect} />
            <AddonsSelector
              selectedAddons={selectedAddons}
              handleAddonToggle={handleAddonToggle}
            />
          </div>
        )
      case 4:
        return (
          <BookingSummaryStep
            bookingData={bookingData}
            formData={formData}
            selectedOccasionObj={selectedOccObj}
            occasionNames={occasionNames}
            selectedCakeObj={selCake}
            selectedAddonObjs={selAddons}
            termsAccepted={termsAccepted}
            handleTermsChange={handleTermsChange}
          />
        )
      default:
        return null;
    }
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Book {bookingData.screen} on {formatDate(bookingData.date)} @ {bookingData.time_slots}
      </h1>

      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      

      <Stepper steps={steps} currentStep={currentStep} />

      <div className="md:grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {renderCurrentStep()}

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={goToPrev}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            ) : (
              <div />
            )}
            {currentStep < 4 ? (
              <Button onClick={goToNext} disabled={!isStepValid()}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!termsAccepted}>
                Process & Pay Advance
              </Button>
            )}
          </div>
        </div>

        <div>
          <BookingSummary
            screenName={bookingData.screen}
            screenPrice={searchParams.get('price') ? parseFloat(searchParams.get('price')!) : 0}
            date={formatDate(bookingData.date)}
            time={bookingData.time_slots}
            customerName={formData.name}
            occasion={selectedOccObj?.name}
            occasionNames={occasionNames.filter((n) => n.trim())}
            cakes={cakes.filter(c => selectedCakes.includes(c.name)).map(c => ({ name: c.name, price: c.price }))}
            addons={addons.filter(a => selectedAddons.includes(a.name)).map(a => ({ name: a.name, price: a.price }))}
            showTerms={currentStep === 4}
            totalAmount={
              (searchParams.get('price') ? parseFloat(searchParams.get('price')!) : 0) + 
              cakes.filter(c => selectedCakes.includes(c.name)).reduce((sum, c) => sum + c.price, 0) +
              addons.filter(a => selectedAddons.includes(a.name)).reduce((sum, a) => sum + a.price, 0)
            }
            advanceAmount={1000}
            balanceAmount={
              (searchParams.get('price') ? parseFloat(searchParams.get('price')!) : 0) + 
              cakes.filter(c => selectedCakes.includes(c.name)).reduce((sum, c) => sum + c.price, 0) +
              addons.filter(a => selectedAddons.includes(a.name)).reduce((sum, a) => sum + a.price, 0) - 
              1000
            }
          />
          <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} />
        </div>
      </div>
    </div>
  )
}
