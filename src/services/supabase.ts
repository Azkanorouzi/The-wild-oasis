import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://vggyeygmupiigrburwzz.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZ3lleWdtdXBpaWdyYnVyd3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzMjg0OTMsImV4cCI6MjAyMDkwNDQ5M30.T59ItDi9MwGy8PbUebJaR-zmEkCJlqKGdcxnARAXuXs"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;