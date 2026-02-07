import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzicblgtdgsbsquvwaai.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6aWNibGd0ZGdzYnNxdXZ3YWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MTg4ODgsImV4cCI6MjA4NTI5NDg4OH0.ReqEbRe5-56pi4kAumY9tQ7I2bCINFu6RKFS6E0HLwU'; 

export const supabase = createClient(supabaseUrl, supabaseKey);