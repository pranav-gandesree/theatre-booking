"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cake, Gift, Heart } from "lucide-react"

interface OccasionOption {
  id: string
  name: string
  icon: React.ReactNode
  requiresNames: number
}

interface OccasionSelectorProps {
  selectedOccasion: string | null
  occasionNames: string[]
  handleOccasionSelect: (occasionId: string) => void
  handleNameChange: (index: number, value: string) => void
}

export default function OccasionSelector({
  selectedOccasion,
  occasionNames,
  handleOccasionSelect,
  handleNameChange,
}: OccasionSelectorProps) {
  const occasions: OccasionOption[] = [
    { id: "birthday", name: "Birthday Celebration", icon: <Cake className="h-8 w-8" />, requiresNames: 1 },
    { id: "anniversary", name: "Wedding Anniversary", icon: <Heart className="h-8 w-8" />, requiresNames: 2 },
    { id: "other", name: "Other Celebration", icon: <Gift className="h-8 w-8" />, requiresNames: 0 },
  ]

  // Get the selected occasion object
  const selectedOccasionObj = occasions.find((occ) => occ.id === selectedOccasion)

  return (
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
              <div className={`mb-3 ${selectedOccasion === occasion.id ? "text-primary" : "text-muted-foreground"}`}>
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
  )
}

