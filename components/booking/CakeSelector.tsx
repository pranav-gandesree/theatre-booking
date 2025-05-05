"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useData } from "@/context/DataContext";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CakeSelectorProps {
  selectedCakes: string[]
  handleCakeSelect: (cakeName: string) => void
}

export default function CakeSelector({ selectedCakes, handleCakeSelect }: CakeSelectorProps) {
  const { cakes } = useData()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Cakes</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cakes.map((cake) => (
          <div
            key={cake.name}
            className={`cursor-pointer overflow-hidden rounded-xl border transition-all hover:border-primary ${
              selectedCakes.includes(cake.name) ? "border-primary ring-2 ring-primary/20" : ""
            }`}
            onClick={() => handleCakeSelect(cake.name)}
          >
            <div className="relative aspect-video">
              <Image src={cake.image || "/placeholder.svg"} alt={cake.name} fill className="object-cover" />
              {selectedCakes.includes(cake.name) && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start space-x-2">
                <div>
                  <Label htmlFor={`cake-${cake.name}`} className="font-medium">
                    {cake.name}
                  </Label>
                  <p className="mt-2 font-bold">₹{cake.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
