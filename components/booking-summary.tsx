"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/currency"

interface BookingSummaryProps {
  screenName: string
  screenPrice: number
  date: string
  time: string
  customerName: string
  occasion?: string
  occasionNames: string[]
  cakes: Array<{
    name: string
    price: number
  }>
  addons: Array<{
    name: string
    price: number
  }>
  showTerms: boolean
  totalAmount: number
  advanceAmount: number
  balanceAmount: number
}

export default function BookingSummary({
  screenName,
  screenPrice,
  date,
  time,
  customerName,
  occasion,
  occasionNames,
  cakes,
  addons,
  showTerms,
  totalAmount,
  advanceAmount,
  balanceAmount,
}: BookingSummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Booking Summary</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Screen Details</h3>
          <p>{screenName}</p>
          <p>Date: {new Date(date).toLocaleDateString()}</p>
          <p>Time: {time}</p>
        </div>

        <div>
          <h3 className="font-medium">Customer Details</h3>
          <p>Name: {customerName}</p>
          {occasion && <p>Occasion: {occasion}</p>}
          {occasionNames.length > 0 && (
            <p>Names: {occasionNames.join(", ")}</p>
          )}
        </div>

        {cakes.length > 0 && (
          <div>
            <h3 className="font-medium">Cakes</h3>
            {cakes.map((cake, index) => (
              <p key={index}>{cake.name} - ₹{cake.price}</p>
            ))}
          </div>
        )}

        {addons.length > 0 && (
          <div>
            <h3 className="font-medium">Add-ons</h3>
            {addons.map((addon, index) => (
              <p key={index}>{addon.name} - ₹{addon.price}</p>
            ))}
          </div>
        )}

        <div>
          <h3 className="font-medium">Pricing</h3>
          <p>Screen Price: ₹{screenPrice}</p>
          {cakes.length > 0 && (
            <p>Cakes Total: ₹{cakes.reduce((sum, cake) => sum + cake.price, 0)}</p>
          )}
          {addons.length > 0 && (
            <p>Add-ons Total: ₹{addons.reduce((sum, addon) => sum + addon.price, 0)}</p>
          )}
          <p className="font-bold">Total Amount: ₹{totalAmount}</p>
          <p>Advance Amount: ₹{advanceAmount}</p>
          <p>Balance Amount: ₹{balanceAmount}</p>
        </div>

        {showTerms && (
          <div className="text-sm text-gray-500">
            <p>By proceeding, you agree to our terms and conditions.</p>
          </div>
        )}
      </div>
    </div>
  )
}
