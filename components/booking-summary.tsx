"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface BookingSummaryProps {
  screenName: string;
  screenPrice: number;
  date: string;
  time: string;
  number: string;
  customerName: string;
  occasion?: string;
  occasionNames: string[];
  cakes: Array<{ name: string; price: number }>;
  addons: Array<{ name: string; price: number }>;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  showTerms?: boolean;
  onTotalAmountChange?: (amount: number) => void;
  onBalanceAmountChange?: (amount: number) => void;
}

interface Discount {
  id: number;
  discount_code: string;
  discount_name: string;
  percentage: number;
  isActive: boolean;
  created_at: string;
}

export default function BookingSummary({
  screenName,
  screenPrice,
  date,
  time,
  customerName,
  occasion,
  cakes,
  number,
  addons,
  totalAmount,
  advanceAmount,
  balanceAmount,
  showTerms,
  onTotalAmountChange,
  onBalanceAmountChange,
}: BookingSummaryProps) {
  // Calculate totals
  const cakesTotal = cakes.reduce((sum, c) => sum + c.price, 0);
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);

  // State
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(totalAmount);
  const [finalBalanceAmount, setFinalBalanceAmount] = useState(
    totalAmount - advanceAmount
  );

  // Fetch discount on mount
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await axios.get<{ discounts: Discount }>(
          "/api/getactivediscounts"
        );
        const discountData = res.data.discounts;
        if (discountData?.isActive) setDiscount(discountData);
      } catch (err) {
        console.error("Could not load discount", err);
      }
    };
    fetchDiscount();
  }, []);

  // Recalculate amounts when values change
  useEffect(() => {
    let newTotal = totalAmount;
    let newBalance = totalAmount - advanceAmount;

    if (discount) {
      const amt = Number(((totalAmount * discount.percentage) / 100).toFixed(2));
      newTotal = Number((totalAmount - amt).toFixed(2));
      newBalance = Number((newTotal - advanceAmount).toFixed(2));
      setDiscountAmount(amt);
    } else {
      setDiscountAmount(0);
    }

    // Only update if values have actually changed
    if (finalAmount !== newTotal) {
      setFinalAmount(newTotal);
      onTotalAmountChange?.(newTotal);
    }
    
    if (finalBalanceAmount !== newBalance) {
      setFinalBalanceAmount(newBalance);
      onBalanceAmountChange?.(newBalance);
    }
  }, [discount, totalAmount, advanceAmount]); // Remove callback dependencies

  // Format date to a more readable format
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100">
      {/* Header - BookMyShow style with red gradient */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Booking Summary</h2>
          {discount && (
            <div className="bg-yellow-400 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {discount.percentage}% OFF
            </div>
          )}
        </div>
        
        {/* Movie ticket inspired design element */}
        <div className="absolute bottom-0 left-0 right-0 flex">
          <div className="h-4 w-4 bg-white rounded-full -mb-2 -ml-2"></div>
          <div className="flex-1 border-b-2 border-dashed border-white/50"></div>
          <div className="h-4 w-4 bg-white rounded-full -mb-2 -mr-2"></div>
        </div>
      </div>

      <div className="p-6">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
          {/* Screen Details */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="flex items-center text-gray-800 font-bold mb-3">
              <span className="text-red-600 mr-2">🎬</span> Screen Details
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span className="text-gray-500">Screen:</span>
                <span className="font-medium">{screenName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">{formattedDate}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Time:</span>
                <span className="font-medium">{time}</span>
              </p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="flex items-center text-gray-800 font-bold mb-3">
              <span className="text-red-600 mr-2">👤</span> Customer Details
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{customerName}</span>
              </p>
              {occasion && (
                <p className="flex justify-between">
                  <span className="text-gray-500">Occasion:</span>
                  <span className="font-medium">{occasion}</span>
                </p>
              )}
              
                <p className="flex justify-between">
                  <span className="text-gray-500">Phone: </span>
                  <span className="font-medium truncate max-w-[200px]" title="number">
                   {number}
                  </span>
                </p>
              
            </div>
          </div>
        </div>

        {/* Food & Add-ons section */}
        {(cakes.length > 0 || addons.length > 0) && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500 border-t border-r border-b border-gray-200">
            <h3 className="text-gray-800 font-bold mb-3">Food & Add-ons</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* Cakes */}
              {cakes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">🍰 Cakes</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {cakes.map((cake, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{cake.name}</span>
                        <span className="font-medium">₹{cake.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              {/* Add-ons */}
              {addons.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">🎁 Add-ons</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {addons.map((addon, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{addon.name}</span>
                        <span className="font-medium">₹{addon.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pricing Summary - Cinema ticket style */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Payment Details</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {/* Regular pricing items */}
            <div className="px-4 py-3 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Screen Price</span>
                <span>₹{screenPrice.toFixed(2)}</span>
              </div>
              
              {cakes.length > 0 && (
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Cakes Total</span>
                  <span>₹{cakesTotal.toFixed(2)}</span>
                </div>
              )}
              
              {addons.length > 0 && (
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Add-ons Total</span>
                  <span>₹{addonsTotal.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              
              {discount && (
                <div className="flex justify-between text-green-600 mt-1">
                  <span>Discount ({discount.discount_code})</span>
                  <span>- ₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            {/* Final totals with prominent styling */}
            <div className="px-4 py-3">
              <div className="flex justify-between items-center font-bold text-base">
                <span>Total{discount ? " After Discount" : ""}</span>
                <span className="text-red-600">₹{finalAmount.toFixed(2)}</span>
              </div>
              
              <div className="mt-2 pt-2 border-t border-dashed border-gray-300">
                <div className="flex justify-between text-gray-600">
                  <span>Advance Paid</span>
                  <span className="text-green-600 font-medium">₹{advanceAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mt-1 font-bold">
                  <span>Balance Due</span>
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded">₹{finalBalanceAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Discount code badge if applicable */}
        {discount && (
          <div className="mt-4 text-center text-xs text-gray-500">
            Discount applied: <span className="font-medium">{discount.discount_name}</span> ({discount.discount_code})
          </div>
        )}
      </div>
      
      {/* Footer with dashed border similar to ticket stub */}
      <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 relative">
        <div className="absolute top-0 left-0 right-0 flex">
          <div className="h-4 w-4 bg-white rounded-full -mt-2 -ml-2"></div>
          <div className="flex-1 border-t-2 border-dashed border-gray-200"></div>
          <div className="h-4 w-4 bg-white rounded-full -mt-2 -mr-2"></div>
        </div>
        Thank you for booking with us!
      </div>
    </div>
  );
}
