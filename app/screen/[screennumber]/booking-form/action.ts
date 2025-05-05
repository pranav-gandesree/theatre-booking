"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getAllTimeSlots() {
  try {
    const { data: timeSlots, error } = await supabase
      .from("time_slots")
      .select("*")
      .order('start_time');

    if (error) {
      console.error("Error fetching time slots:", error);
      return { error: error.message };
    }

    return { timeSlots };
  } catch (error) {
    console.error("Error in getAllTimeSlots:", error);
    return { error: "Failed to fetch time slots" };
  }
}




export async function getScreenDetails(screenNumber: string) {
  try {
    const { data: screen, error } = await supabase
      .from("screens")
      .select("name, capacity")
      .eq("id", screenNumber)
      .single();

    if (error) {
      console.error("Error fetching screen details:", error);
      return { error: error.message };
    }
    
    return { screen };
  } catch (error) {
    console.error("Error in getScreenDetails:", error);
    return { error: "Failed to fetch screen details" };
  }
}




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
