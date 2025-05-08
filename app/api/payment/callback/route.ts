import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract data from the Razorpay webhook callback
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, booking_id } = body;
    
    // Verify the payment signature if available
    if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
      // Get your Razorpay key secret from environment variables
      const secret = process.env.RAZORPAY_KEY_SECRET;
      
      if (!secret) {
        return NextResponse.json(
          { error: "Razorpay secret key not configured" },
          { status: 500 }
        );
      }
      
      // Generate a signature for verification
      const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");
      
      // Verify signature
      if (generated_signature === razorpay_signature) {
        // Payment is successful, update booking status in database
        const { data, error } = await supabase
          .from("bookings")
          .update({
            payment_status: "completed",
            transaction_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            payment_method: "razorpay",
            payment_timestamp: new Date().toISOString(),
          })
          .eq("id", booking_id)
          .select();
        
        if (error) {
          console.error("Error updating booking:", error);
          return NextResponse.json(
            { error: "Failed to update booking status" },
            { status: 500 }
          );
        }
        
        return NextResponse.json(
          { 
            success: true, 
            message: "Payment successful and booking updated",
            booking: data?.[0]
          },
          { status: 200 }
        );
      } else {
        // Signature verification failed
        return NextResponse.json(
          { error: "Payment verification failed" },
          { status: 400 }
        );
      }
    } else {
      // Missing payment information
      return NextResponse.json(
        { error: "Incomplete payment information received" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json(
      { error: "Failed to process payment callback" },
      { status: 500 }
    );
  }
} 