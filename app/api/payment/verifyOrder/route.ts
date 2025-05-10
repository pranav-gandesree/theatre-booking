// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";

// const generatedSignature = (
//   razorpayOrderId: string,
//   razorpayPaymentId: string
// ) => {
//   const keySecret = process.env.RAZORPAY_SECRET_ID as string;

//   const sig = crypto
//     .createHmac("sha256", keySecret)
//     .update(razorpayOrderId + "|" + razorpayPaymentId)
//     .digest("hex");
//   return sig;
// };

// export async function POST(request: NextRequest) {
//   const { orderId, razorpayPaymentId, razorpaySignature } =
//     await request.json();

//   const signature = generatedSignature(orderId, razorpayPaymentId);
//   if (signature !== razorpaySignature) {
//     return NextResponse.json(
//       { message: "payment verification failed", isOk: false },
//       { status: 400 }
//     );
//   }

//   // Probably some database calls here to update order or add premium status to user
//   return NextResponse.json(
//     { message: "payment verified successfully", isOk: true },
//     { status: 200 }
//   );
// }




































import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

function generateSignature(orderId: string, paymentId: string) {
  return crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_ID!)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}

export async function POST(req: NextRequest) {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
    await req.json();

  // 1) Verify the signature
  const expectedSig = generateSignature(
    razorpayOrderId,
    razorpayPaymentId
  );
  if (expectedSig !== razorpaySignature) {
    return NextResponse.json(
      { message: "Signature mismatch", isOk: false },
      { status: 400 }
    );
  }

  // 2) Update the booking to “confirmed”
  const { error } = await supabase
    .from("bookings")
    .update({
      status: "confirmed",
      payment_id: razorpayPaymentId,
    })
    .eq("order_id", razorpayOrderId);

  if (error) {
    console.error("DB Update Error:", error);
    return NextResponse.json(
      { message: "Could not update booking", isOk: false },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Payment verified", isOk: true },
    { status: 200 }
  );
}
