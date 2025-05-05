
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
     // book the ticket
     const bookingData = await request.json();
     console.log("Booking data: from frontend is", bookingData);

     
     
     return NextResponse.json({
       bookingData
     }, { status: 200 });
   } catch (error) {
     return NextResponse.json({ error: "Failed to book the ticket" }, { status: 500 });
   }
}