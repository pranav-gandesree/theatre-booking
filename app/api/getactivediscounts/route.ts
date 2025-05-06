import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {

    // Fetch screens with their time slots
    try {
        
        const { data: discounts, error } = await supabase
          .from('discounts')
          .select('*')
          .eq('isActive', true)
          .single();
        
          if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
          }
      
       
    return NextResponse.json({ discounts }, { status: 200 });
  } catch (error) {
    console.log("cannot get discounts", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

}