"use client";

interface BookingSummaryProps {
  screenName: string;
  screenPrice: number;
  date: string;
  time: string;
  customerName: string;
  occasion?: string;
  occasionNames: string[];
  cakes: Array<{
    name: string;
    price: number;
  }>;
  addons: Array<{
    name: string;
    price: number;
  }>;
  showTerms: boolean;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
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
  totalAmount,
  advanceAmount,
  balanceAmount,
}: BookingSummaryProps) {
  const cakesTotal = cakes.reduce((sum, c) => sum + c.price, 0);
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-primary">Booking Summary</h2>

      {/* Screen Details */}
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          🎥 Screen Details
        </h3>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Screen:</span> {screenName}</p>
          <p><span className="font-medium">Date:</span> {new Date(date).toLocaleDateString()}</p>
          <p><span className="font-medium">Time:</span> {time}</p>
        </div>
      </div>

      {/* Customer Details */}
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          🧍 Customer Details
        </h3>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Name:</span> {customerName}</p>
          {occasion && <p><span className="font-medium">Occasion:</span> {occasion}</p>}
          {occasionNames.length > 0 && (
            <p><span className="font-medium">Names:</span> {occasionNames.join(", ")}</p>
          )}
        </div>
      </div>

      {/* Cakes */}
      {cakes.length > 0 && (
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            🍰 Cakes
          </h3>
          <ul className="text-sm list-disc list-inside space-y-1">
            {cakes.map((cake, index) => (
              <li key={index}>
                {cake.name} - ₹{cake.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add-ons */}
      {addons.length > 0 && (
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            🎁 Add-ons
          </h3>
          <ul className="text-sm list-disc list-inside space-y-1">
            {addons.map((addon, index) => (
              <li key={index}>
                {addon.name} - ₹{addon.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pricing Summary */}
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          💰 Pricing Summary
        </h3>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Screen Price:</span> ₹{screenPrice}</p>
          {cakes.length > 0 && <p><span className="font-medium">Cakes Total:</span> ₹{cakesTotal}</p>}
          {addons.length > 0 && <p><span className="font-medium">Add-ons Total:</span> ₹{addonsTotal}</p>}
          <p className="font-bold text-primary mt-2">Total: ₹{totalAmount}</p>
          <p className="text-yellow-700">Advance Paid: ₹{advanceAmount}</p>
          <p className="text-red-600">Balance Due: ₹{balanceAmount}</p>
        </div>
      </div>
    </div>
  );
}
