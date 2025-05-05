"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, MapPin, Cake, Gift, Heart } from "lucide-react"
import BookingSummary from "@/components/booking-summary"

// Define interfaces for our data types
interface BookingData {
  screenId: number
  screenName: string
  date: string
  time: string
  price: number
  persons: number
  customerName?: string
  email?: string
  whatsapp?: string
  wantDecoration?: string
  occasion?: string
  occasionName?: string
  occasionNames?: string[]
  cake?: {
    id: string
    name: string
    price: number
  }
  addons?: Array<{
    id: string
    name: string
    price: number
  }>
}

interface OccasionOption {
  id: string
  name: string
  icon: React.ReactNode
  requiresNames: number
}

interface CakeOption {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface AddonOption {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function BookingFormPage() {
  const router = useRouter()

  // State for the current step
  const [currentStep, setCurrentStep] = useState(1)

  // State for booking data
  const [bookingData, setBookingData] = useState<BookingData>({
    screenId: 1,
    screenName: "",
    date: "",
    time: "",
    price: 0,
    persons: 2,
  })

  // Form states for each step
  const [formData, setFormData] = useState({
    name: "",
    persons: "",
    whatsapp: "",
    email: "",
    wantDecoration: "no",
  })

  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const [occasionNames, setOccasionNames] = useState<string[]>(["", ""])
  const [selectedCake, setSelectedCake] = useState<string | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Define step options
  const occasions: OccasionOption[] = [
    { id: "birthday", name: "Birthday Celebration", icon: <Cake className="h-8 w-8" />, requiresNames: 1 },
    { id: "anniversary", name: "Wedding Anniversary", icon: <Heart className="h-8 w-8" />, requiresNames: 2 },
    { id: "other", name: "Other Celebration", icon: <Gift className="h-8 w-8" />, requiresNames: 0 },
  ]

  const cakes: CakeOption[] = [
    {
      id: "strawberry",
      name: "Strawberry Delight",
      description: "Fresh strawberry cake with cream cheese frosting",
      price: 1200,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "chocolate",
      name: "Chocolate Truffle",
      description: "Rich chocolate cake with ganache frosting",
      price: 1500,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "pineapple",
      name: "Pineapple Perfection",
      description: "Classic pineapple cake with whipped cream",
      price: 1000,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "butterscotch",
      name: "Butterscotch Bliss",
      description: "Butterscotch cake with caramel drizzle",
      price: 1300,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "redvelvet",
      name: "Red Velvet",
      description: "Classic red velvet with cream cheese frosting",
      price: 1600,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "blackforest",
      name: "Black Forest",
      description: "Chocolate cake with cherries and whipped cream",
      price: 1400,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const addons: AddonOption[] = [
    {
      id: "fog",
      name: "Fog Effect",
      description: "Create a magical atmosphere with our fog machine",
      price: 1500,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "photos",
      name: "Photo Clippings",
      description: "Display your favorite photos around the venue",
      price: 1000,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "candles",
      name: "Candle Path",
      description: "Romantic pathway with LED candles",
      price: 800,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "balloons",
      name: "Balloon Decorations",
      description: "Colorful balloon arrangements",
      price: 1200,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "flowers",
      name: "Flower Arrangements",
      description: "Beautiful fresh flower decorations",
      price: 2000,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "confetti",
      name: "Confetti Shower",
      description: "Celebratory confetti shower at a key moment",
      price: 500,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  // Load initial data from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setBookingData(parsedData)

      // Pre-fill form data if available
      setFormData({
        name: parsedData.customerName || "",
        persons: parsedData.persons?.toString() || "2",
        whatsapp: parsedData.whatsapp || "",
        email: parsedData.email || "",
        wantDecoration: parsedData.wantDecoration || "no",
      })

      // Pre-fill occasion data if available
      if (parsedData.occasion) {
        setSelectedOccasion(parsedData.occasion)
      }
      if (parsedData.occasionNames && parsedData.occasionNames.length) {
        setOccasionNames(parsedData.occasionNames)
      }

      // Pre-fill cake selection if available
      if (parsedData.cake && parsedData.cake.id) {
        setSelectedCake(parsedData.cake.id)
      }

      // Pre-fill addons if available
      if (parsedData.addons && Array.isArray(parsedData.addons)) {
        setSelectedAddons(parsedData.addons.map((addon: any) => addon.id))
      }
    }
  }, [])

  // Helper functions for form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, wantDecoration: value }))
  }

  const handleOccasionSelect = (occasionId: string) => {
    setSelectedOccasion(occasionId)
  }

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...occasionNames]
    newNames[index] = value
    setOccasionNames(newNames)
  }

  const handleCakeSelect = (cakeId: string) => {
    setSelectedCake(cakeId)
  }

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) => {
      if (prev.includes(addonId)) {
        return prev.filter((id) => id !== addonId)
      } else {
        return [...prev, addonId]
      }
    })
  }

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked)
  }

  // Navigation functions
  const goToNextStep = () => {
    // Save current step data
    saveCurrentStepData()

    // Move to next step
    setCurrentStep((prev) => prev + 1)
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const saveCurrentStepData = () => {
    let updatedData = { ...bookingData }

    // Save data based on current step
    if (currentStep === 1) {
      updatedData = {
        ...updatedData,
        customerName: formData.name,
        persons: Number.parseInt(formData.persons),
        whatsapp: formData.whatsapp,
        email: formData.email,
        wantDecoration: formData.wantDecoration,
      }
    } else if (currentStep === 2) {
      // Get the selected occasion object
      const selectedOccasionObj = occasions.find((occ) => occ.id === selectedOccasion)

      // Filter names based on how many are required
      const filteredNames = selectedOccasionObj
        ? occasionNames.slice(0, selectedOccasionObj.requiresNames).filter((name) => name.trim() !== "")
        : []

      updatedData = {
        ...updatedData,
        occasion: selectedOccasion || undefined,
        occasionName: selectedOccasionObj?.name || "",
        occasionNames: filteredNames,
      }
    } else if (currentStep === 3) {
      // Get the selected cake object
      const selectedCakeObj = cakes.find((cake) => cake.id === selectedCake)

      updatedData = {
        ...updatedData,
        cake: selectedCakeObj
          ? {
              id: selectedCakeObj.id,
              name: selectedCakeObj.name,
              price: selectedCakeObj.price,
            }
          : undefined,
      }

      // Get the selected addon objects
      const selectedAddonObjs = addons.filter((addon) => selectedAddons.includes(addon.id))

      updatedData = {
        ...updatedData,
        addons: selectedAddonObjs.map((addon) => ({
          id: addon.id,
          name: addon.name,
          price: addon.price,
        })),
      }
    }

    // Update state and sessionStorage
    setBookingData(updatedData)
    sessionStorage.setItem("bookingData", JSON.stringify(updatedData))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save final data
    saveCurrentStepData()

    // In a real application, you would process the payment here
    alert("Payment processing would happen here. Booking confirmed!")

    // Navigate to home
    router.push("/")
  }

  const handleBack = () => {
    router.push("/book-now")
  }

  // Get objects for summary
  const selectedOccasionObj = occasions.find((occ) => occ.id === selectedOccasion)
  const selectedCakeObj = cakes.find((cake) => cake.id === selectedCake)
  const selectedAddonObjs = addons
    .filter((addon) => selectedAddons.includes(addon.id))
    .map((addon) => ({
      name: addon.name,
      price: addon.price,
    }))

  // Calculate total amount
  const baseAmount = bookingData.price || 199
  const cakeAmount = selectedCakeObj?.price || 0
  const addonsAmount = selectedAddonObjs.reduce((sum, addon) => sum + addon.price, 0)
  const totalAmount = baseAmount + cakeAmount + addonsAmount

  // Determine if the current step is valid for proceeding
  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.name && formData.persons && formData.whatsapp && formData.email
    } else if (currentStep === 2) {
      if (!selectedOccasion) return false

      const selectedOccasionObj = occasions.find((occ) => occ.id === selectedOccasion)
      if (selectedOccasionObj && selectedOccasionObj.requiresNames > 0) {
        return occasionNames.slice(0, selectedOccasionObj.requiresNames).every((name) => name.trim() !== "")
      }
      return true
    } else if (currentStep === 3) {
      return true // Cake and addons are optional
    } else if (currentStep === 4) {
      return termsAccepted
    }
    return false
  }

  return (
    <div className="container px-4 py-8 sm:px-6">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Screens
      </Button>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex justify-between">
          {["Customer Details", "Occasion", "Extras", "Summary"].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  currentStep > index + 1
                    ? "bg-primary text-primary-foreground border-primary"
                    : currentStep === index + 1
                      ? "border-primary text-primary"
                      : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {currentStep > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span
                className={`mt-2 text-sm ${currentStep >= index + 1 ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all"
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left side - Form steps */}
        <div className="md:col-span-2">
          {/* Step 1: Customer Details */}
          {currentStep === 1 && (
            <div>
              <h1 className="mb-6 text-3xl font-bold">Customer Details</h1>

              <div className="mb-8 rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Venue & Timing Details</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-muted-foreground">{bookingData.screenName || "Screen"}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CalendarDays className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{bookingData.date || "Not selected"}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">{bookingData.time || "Not selected"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Booking Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="persons">Number of Persons</Label>
                  <Input
                    id="persons"
                    name="persons"
                    type="number"
                    value={formData.persons}
                    onChange={handleInputChange}
                    placeholder="Enter number of persons"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Enter your WhatsApp number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Do you want decoration?</Label>
                  <RadioGroup value={formData.wantDecoration} onValueChange={handleRadioChange}>
                    <div className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="decoration-yes" />
                        <Label htmlFor="decoration-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="decoration-no" />
                        <Label htmlFor="decoration-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Occasion */}
          {currentStep === 2 && (
            <div>
              <h1 className="mb-6 text-3xl font-bold">Select Your Occasion</h1>

              <form className="space-y-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {occasions.map((occasion) => (
                    <div
                      key={occasion.id}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border p-6 text-center transition-all hover:border-primary ${
                        selectedOccasion === occasion.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleOccasionSelect(occasion.id)}
                    >
                      <div
                        className={`mb-3 ${selectedOccasion === occasion.id ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {occasion.icon}
                      </div>
                      <h3 className="font-medium">{occasion.name}</h3>
                    </div>
                  ))}
                </div>

                {selectedOccasionObj && selectedOccasionObj.requiresNames > 0 && (
                  <div className="mt-6 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-medium">
                      {selectedOccasionObj.id === "birthday"
                        ? "Whose birthday is it?"
                        : selectedOccasionObj.id === "anniversary"
                          ? "Enter couple's names"
                          : "Enter name(s)"}
                    </h3>

                    {Array.from({ length: selectedOccasionObj.requiresNames }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <Label htmlFor={`name-${index}`}>
                          {selectedOccasionObj.requiresNames === 1
                            ? "Name"
                            : index === 0
                              ? "First Person's Name"
                              : "Second Person's Name"}
                        </Label>
                        <Input
                          id={`name-${index}`}
                          value={occasionNames[index] || ""}
                          onChange={(e) => handleNameChange(index, e.target.value)}
                          placeholder="Enter name"
                          required
                        />
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Step 3: Cake and Add-ons */}
          {currentStep === 3 && (
            <div>
              <h1 className="mb-6 text-3xl font-bold">Select Extras</h1>

              <div className="space-y-8">
                {/* Cake Selection */}
                <div>
                  <h2 className="mb-4 text-xl font-bold">Choose a Cake (Optional)</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cakes.map((cake) => (
                      <div
                        key={cake.id}
                        className={`cursor-pointer overflow-hidden rounded-xl border transition-all hover:border-primary ${
                          selectedCake === cake.id ? "border-primary ring-2 ring-primary/20" : ""
                        }`}
                        onClick={() => handleCakeSelect(cake.id)}
                      >
                        <div className="relative aspect-square">
                          <Image src={cake.image || "/placeholder.svg"} alt={cake.name} fill className="object-cover" />
                          {selectedCake === cake.id && (
                            <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{cake.name}</h3>
                          <p className="text-sm text-muted-foreground">{cake.description}</p>
                          <p className="mt-2 font-bold">₹{cake.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons Selection */}
                <div>
                  <h2 className="mb-4 text-xl font-bold">Select Add-ons (Optional)</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {addons.map((addon) => (
                      <div
                        key={addon.id}
                        className={`cursor-pointer overflow-hidden rounded-xl border transition-all hover:border-primary ${
                          selectedAddons.includes(addon.id) ? "border-primary ring-2 ring-primary/20" : ""
                        }`}
                        onClick={() => handleAddonToggle(addon.id)}
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={addon.image || "/placeholder.svg"}
                            alt={addon.name}
                            fill
                            className="object-cover"
                          />
                          {selectedAddons.includes(addon.id) && (
                            <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id={`addon-${addon.id}`}
                              checked={selectedAddons.includes(addon.id)}
                              onCheckedChange={() => handleAddonToggle(addon.id)}
                              className="mt-1"
                            />
                            <div>
                              <Label htmlFor={`addon-${addon.id}`} className="font-medium">
                                {addon.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">{addon.description}</p>
                              <p className="mt-2 font-bold">₹{addon.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 4 && (
            <div>
              <h1 className="mb-6 text-3xl font-bold">Booking Summary</h1>

              <div className="space-y-6">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-bold">Venue & Timing Details</h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Venue</p>
                        <p className="text-muted-foreground">{bookingData.screenName || "Screen"}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CalendarDays className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-muted-foreground">{bookingData.date || "Not selected"}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-muted-foreground">{bookingData.time || "Not selected"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-bold">Customer Details</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-muted-foreground">{formData.name || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Number of Persons</p>
                      <p className="text-muted-foreground">{formData.persons || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-muted-foreground">{formData.whatsapp || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{formData.email || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                {selectedOccasion && (
                  <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold">Occasion Details</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="font-medium">Occasion</p>
                        <p className="text-muted-foreground">{selectedOccasionObj?.name || "Not specified"}</p>
                      </div>
                      {occasionNames.filter((name) => name.trim() !== "").length > 0 && (
                        <div>
                          <p className="font-medium">For</p>
                          <p className="text-muted-foreground">
                            {occasionNames.filter((name) => name.trim() !== "").join(" & ")}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">Decoration</p>
                        <p className="text-muted-foreground">{formData.wantDecoration === "yes" ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCake && (
                  <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold">Cake Selection</h2>
                    <div className="flex items-start space-x-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt={selectedCakeObj?.name || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{selectedCakeObj?.name}</p>
                        <p className="text-muted-foreground">₹{selectedCakeObj?.price}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedAddons.length > 0 && (
                  <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold">Selected Add-ons</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {selectedAddonObjs.map((addon, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src="/placeholder.svg?height=64&width=64"
                              alt={addon.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{addon.name}</p>
                            <p className="text-muted-foreground">₹{addon.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-bold">Terms & Conditions</h2>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>1. A 50% advance payment is required to confirm your booking.</p>
                    <p>2. The remaining balance must be paid at least 24 hours before the event.</p>
                    <p>
                      3. Cancellations made more than 72 hours in advance will receive a full refund of the advance
                      payment.
                    </p>
                    <p>4. Cancellations made between 24-72 hours will receive a 50% refund of the advance payment.</p>
                    <p>5. No refunds for cancellations made less than 24 hours before the event.</p>
                    <p>6. The venue must be vacated at the scheduled end time to avoid additional charges.</p>
                  </div>
                  <div className="mt-4 flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1"
                      checked={termsAccepted}
                      onChange={handleTermsChange}
                      required
                    />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the Terms and Conditions
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}

            {currentStep < 4 ? (
              <Button type="button" onClick={goToNextStep} disabled={!isStepValid()}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={!termsAccepted}>
                Process & Pay Advance
              </Button>
            )}
          </div>
        </div>

        {/* Right side - Booking summary */}
        <div>
          <BookingSummary
            screenName={bookingData.screenName || "Screen"}
            date={bookingData.date}
            time={bookingData.time}
            persons={Number.parseInt(formData.persons) || bookingData.persons}
            customerName={formData.name}
            occasion={selectedOccasionObj?.name}
            occasionNames={occasionNames.filter((name) => name.trim() !== "")}
            cake={
              selectedCakeObj
                ? {
                    name: selectedCakeObj.name,
                    price: selectedCakeObj.price,
                  }
                : undefined
            }
            addons={selectedAddonObjs}
            showTerms={currentStep === 4}
            totalAmount={totalAmount}
          />

          {/* Step indicator */}
          <div className="mt-6 rounded-xl border bg-card p-4">
            <h3 className="font-medium">Booking Progress</h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep} of 4</span>
                <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

