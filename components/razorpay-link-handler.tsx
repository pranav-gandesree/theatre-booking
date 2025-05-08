"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

interface RazorpayParams {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  booking_id?: string;
}

export default function RazorpayLinkHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "failed">("pending");
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract payment verification data from URL params
        const paymentId = searchParams.get("razorpay_payment_id");
        const orderId = searchParams.get("razorpay_order_id");
        const signature = searchParams.get("razorpay_signature");
        const bookingId = searchParams.get("booking_id");

        // Check if we have all required parameters
        if (!paymentId || !orderId || !signature) {
          setVerificationStatus("failed");
          setLoading(false);
          return;
        }

        // Verify payment with our API
        const response = await axios.post("/api/payment/verify", {
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
          booking_id: bookingId,
        });

        // Check response and update status
        if (response.data.success) {
          setVerificationStatus("success");
          setBookingDetails(response.data.data);
          toast({
            title: "Payment Successful",
            description: "Your payment has been verified successfully.",
            variant: "default",
          });
        } else {
          setVerificationStatus("failed");
          toast({
            title: "Payment Verification Failed",
            description: "We couldn't verify your payment. Please contact support.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setVerificationStatus("failed");
        toast({
          title: "Payment Verification Error",
          description: "There was an error verifying your payment.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    // Run verification if we have params in the URL
    if (
      searchParams.has("razorpay_payment_id") ||
      searchParams.has("razorpay_order_id") ||
      searchParams.has("razorpay_signature")
    ) {
      verifyPayment();
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h2 className="text-xl font-bold">Verifying Payment</h2>
            <p className="text-muted-foreground mt-2">Please wait while we verify your payment...</p>
          </div>
        ) : verificationStatus === "success" ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-green-700">Payment Successful!</h2>
            <p className="text-muted-foreground mt-2">
              Your booking has been confirmed and payment has been received.
            </p>
            {bookingDetails && (
              <div className="mt-6 bg-gray-50 p-4 rounded-md text-left w-full">
                <h3 className="font-semibold mb-2">Booking Details</h3>
                <p className="text-sm"><span className="font-medium">Transaction ID:</span> {bookingDetails.transaction_id}</p>
                <p className="text-sm"><span className="font-medium">Amount:</span> ₹{bookingDetails.payment_amount}</p>
                <p className="text-sm"><span className="font-medium">Date:</span> {new Date(bookingDetails.payment_timestamp).toLocaleString()}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-red-700">Payment Verification Failed</h2>
            <p className="text-muted-foreground mt-2">
              We couldn't verify your payment. Please contact our support team.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={() => router.push("/my-bookings")}>
          View My Bookings
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 