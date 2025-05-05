"use client"

import type React from "react"

import Image from "next/image"
import { CalendarDays, Clock, MapPin } from "lucide-react"

interface BookingSummaryStepProps {
  bookingData: any
  formData: any
  selectedOccasionObj: any
  occasionNames: string[]
  selectedCakeObj: any
  selectedAddonObjs: any[]
  termsAccepted: boolean
  handleTermsChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function BookingSummaryStep({
  bookingData,
  formData,
  selectedOccasionObj,
  occasionNames,
  selectedCakeObj,
  selectedAddonObjs,
  termsAccepted,
  handleTermsChange,
}: BookingSummaryStepProps) {
  return (
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

        {selectedOccasionObj && (
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

        {selectedCakeObj && (
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

        {selectedAddonObjs.length > 0 && (
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Selected Add-ons</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {selectedAddonObjs.map((addon, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image src="/placeholder.svg?height=64&width=64" alt={addon.name} fill className="object-cover" />
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
              3. Cancellations made more than 72 hours in advance will receive a full refund of the advance payment.
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
  )
}

