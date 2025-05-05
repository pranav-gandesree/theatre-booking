"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function saveBooking(formData: FormData) {
  const screenNumber = formData.get("screenNumber");
  const timeSlot = formData.get("timeSlot");
  const occasion = formData.get("occasion");
  const extraDecoration = formData.get("extraDecoration") === "true";
  const cakeType = formData.get("cakeType");
  const email = formData.get("email");
  const totalPrice = formData.get("totalPrice");

  const { data, error } = await supabase
    .from("bookings")
    .insert([{ screen_number: screenNumber, time_slot: timeSlot, occasion, extra_decoration: extraDecoration, cake_type: cakeType, email, total_price: totalPrice }]);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Booking confirmed!" };
}
