import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      booking_id 
    } = body;
    
    // Validate required parameters
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "All payment parameters are required" },
        { status: 400 }
      );
    }
    
    // Get the Razorpay key secret
    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!secret) {
      return NextResponse.json(
        { error: "Razorpay secret key not configured" },
        { status: 500 }
      );
    }
    
    // Create a signature for verification
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    
    // Verify payment signature
    if (generated_signature === razorpay_signature) {
      // Payment is verified, update booking in database
      const { data, error } = await supabase
        .from("bookings")
        .update({
          payment_status: "completed",
          transaction_id: razorpay_payment_id,
          payment_method: "razorpay",
          payment_verified: true,
          payment_timestamp: new Date().toISOString()
        })
        .eq("id", booking_id)
        .select();
      
      if (error) {
        console.error("Error updating booking payment status:", error);
        return NextResponse.json(
          { error: "Failed to update booking payment status" },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { 
          success: true, 
          message: "Payment verification successful",
          data: data?.[0]
        },
        { status: 200 }
      );
    } else {
      // Signature verification failed
      return NextResponse.json(
        { error: "Payment signature verification failed" },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
} 