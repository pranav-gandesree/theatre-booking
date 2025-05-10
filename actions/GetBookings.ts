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



export const GetBookingsByNumber = async (number: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('number', number)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error.message);
    return [];
  }

  return data;
};



export const GetBookingsByDate = async (date: Date) => {
  try {
    if (!date) {
      return { error: 'Date parameter is required' };
    }

    // Normalize the date to UTC start and end of the day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from('bookings')
      .select('time_slots, screen, date')
      .gte('date', startDate.toISOString())
      .lte('date', endDate.toISOString());

    if (error) {
      return { error: error.message };
    }

    return { bookings: data };
  } catch (err) {
    console.error('Error fetching bookings by date:', err);
    return { error: 'Internal Server Error' };
  }
};
