import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://kwzxuscknzzjnafalzdo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3enh1c2Nrbnp6am5hZmFsemRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjkzMzYsImV4cCI6MjA2NzgwNTMzNn0.58g5xeuMh-mifjp1bMyauHteVRgkZIh0lst9HuTb0GA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
