import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import Razorpay from "razorpay";

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, booking_id, customer_name, email, phone } = body;

    // Validate required fields
    if (!amount || !booking_id) {
      return NextResponse.json(
        { error: "Amount and booking_id are required" },
        { status: 400 }
      );
    }

    // Create a Razorpay order
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `booking_${booking_id}`,
      notes: {
        booking_id: booking_id,
        customer_name: customer_name || "",
        email: email || "",
        phone: phone || "",
      },
    };

    // Create the order
    const order = await razorpay.orders.create(options);

    // Update booking with order details
    await supabase
      .from("bookings")
      .update({
        order_id: order.id,
        payment_status: "pending",
        payment_amount: amount,
      })
      .eq("id", booking_id);

    // Return payment details to client
    return NextResponse.json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    }, { status: 200 });
    
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
} 