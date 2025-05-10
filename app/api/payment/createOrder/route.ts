// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
//   key_secret: process.env.RAZORPAY_SECRET_ID,
// });

// export async function POST(req: Request) {
// //   const { amount } = await req.json();
//   const order = await razorpay.orders.create({
//     amount: 700 * 100,
//     currency: "INR",
//   });

//   return NextResponse.json(order);
// }


























import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";


const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_ID!,
});


export async function POST(req: Request) {
  const { payload } = await req.json();

  console.log("booking data is", payload)

  // 1) Create Razorpay order
  const order = await razorpay.orders.create({
    amount: 700 * 100, 
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  // 2) Insert a pending booking into Supabase
  const { error } = await supabase
    .from("bookings")
    .insert([
      {
        order_id: order.id,
        booking_name: payload.booking_name,
        total_persons: payload.total_persons,   
        first_person_name: payload.first_person_name,
        second_person_name: payload.second_person_name,
        email_id: payload.email_id,
        number: payload.number,
        screen: payload.screen,
        occasion: payload.occasion,
        cake: payload.cake,
        add_ons: payload.add_ons,
        date: payload.date,
        time_slots: payload.time_slots,
        total_price: payload.total_price,
        balance_amount: payload.balance_amount,
        status: "pending",
      },
    ]);

  if (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json(
      { error: "Could not save booking" },
      { status: 500 }
    );
  }

  // 3) Return order details + your public key
  return NextResponse.json({
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    razorpayKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });


}
