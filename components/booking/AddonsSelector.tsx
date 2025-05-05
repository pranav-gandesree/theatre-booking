"use client"

import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { useData } from "@/context/DataContext"

interface AddonsSelectorProps {
  selectedAddons: string[]
  handleAddonToggle: (addonName: string) => void
}

export default function AddonsSelector({ selectedAddons, handleAddonToggle }: AddonsSelectorProps) {
  const { addons, loading } = useData();

  if (loading) {
    return <p>Loading Addons...</p>;
  }

  if (!addons || addons.length === 0) {
    return <p>No Addons available</p>;
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Select Add-ons (Optional)</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {addons?.map((addon) => (
          <div
            key={addon.name}
            className={`cursor-pointer overflow-hidden rounded-xl border transition-all hover:border-primary ${
              selectedAddons.includes(addon.name) ? "border-primary ring-2 ring-primary/20" : ""
            }`}
            onClick={() => handleAddonToggle(addon.name)}
          >
            <div className="relative aspect-video">
              <Image src={addon.image || "/placeholder.svg"} alt={addon.name} fill className="object-cover" />
              {selectedAddons.includes(addon.name) && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start space-x-2">
                <div>
                  <Label htmlFor={`addon-${addon.name}`} className="font-medium">
                    {addon.name}
                  </Label>
                  <p className="mt-2 font-bold">₹{addon.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

