import { supabase } from "@/lib/supabase";

export const getBookings = async (email: string) => {

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('email_id', email)
    .order('created_at', { ascending: false }); 

  if (error) {
    console.error('Error fetching bookings:', error.message);
    return [];
  }

  return data;
};
