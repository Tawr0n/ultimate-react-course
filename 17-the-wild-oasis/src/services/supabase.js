import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://adtdehqizisyhlkkctgw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdGRlaHFpemlzeWhsa2tjdGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3NTczNTYsImV4cCI6MjAyNTMzMzM1Nn0.KWvr_3pY0lLrKcOGEPcG1zxnWyy-8ISNGUSQUGL_fRY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
