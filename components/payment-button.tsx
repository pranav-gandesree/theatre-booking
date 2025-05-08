"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { toast } from "@/components/ui/use-toast";

interface PaymentButtonProps {
  amount: number;
  booking_id: string | number;
  customer_name?: string;
  email?: string;
  phone?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  variant?: "default" | "outline" | "destructive" | "ghost" | "link" | "secondary";
  className?: string;
  text?: string;
}

interface PaymentResult {
  success: boolean;
  data?: any;
  payment_id?: string | null;
  error?: {
    description?: string;
    [key: string]: any;
  };
}

export default function PaymentButton({
  amount,
  booking_id,
  customer_name,
  email,
  phone,
  onSuccess,
  onError,
  variant = "default",
  className = "",
  text = "Pay Now"
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Validate amount
      if (!amount || amount <= 0) {
        throw new Error("Invalid payment amount");
      }

      // Open Razorpay checkout
      const result = await openRazorpayCheckout({
        amount,
        booking_id,
        customer_name,
        email,
        phone
      }) as PaymentResult;

      // Handle result
      if (result.success) {
        toast({
          title: "Payment Successful",
          description: `Payment ID: ${result.payment_id}`,
          variant: "default",
        });
        onSuccess?.(result);
      } else {
        toast({
          title: "Payment Failed",
          description: result.error?.description || "There was an error processing your payment.",
          variant: "destructive",
        });
        onError?.(result.error);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment.",
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
} 