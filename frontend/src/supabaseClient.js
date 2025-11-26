import { createClient } from "@supabase/supabase-js";

// Replace these values with your Supabase project URL and anon public key
const supabaseUrl = "https://jwejpjknndfwztudaani.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWpwamtubmRmd3p0dWRhYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzUxODMsImV4cCI6MjA3OTU1MTE4M30.bTaiLQMNO-qEm2ip_y8bNsW_rcYVZZz6v2munWVfXBs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
