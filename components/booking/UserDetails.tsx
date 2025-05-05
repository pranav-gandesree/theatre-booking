"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarDays, Clock, MapPin } from "lucide-react"

interface UserDetailsProps {
  bookingData: {
    screen_name: string
    date: string
    time_slots: string
  }
  formData: {
    name: string
    persons: string
    number: string
    email: string
    wantDecoration: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRadioChange: (value: string) => void
}

export default function UserDetails({
  bookingData,
  formData,
  handleInputChange,
  handleRadioChange,
}: UserDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Customer Details</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="persons">Number of Persons</Label>
          <Input
            id="persons"
            name="persons"
            type="number"
            min="1"
            value={formData.persons}
            onChange={handleInputChange}
            placeholder="Enter number of persons"
            required
          />
          
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="number"
            name="number"
            type="tel"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="Enter your WhatsApp number"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
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
      </div>

      
    </div>
  )
}

