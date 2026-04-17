import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pjtvcuxfhprcpotahkxr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqdHZjdXhmaHByY3BvdGFoa3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzODkzMjIsImV4cCI6MjA5MTk2NTMyMn0.JXlFRhOgL8aSJ7ffRZ3LHF3rZV4lI5JrBrvAMO7IN90'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
