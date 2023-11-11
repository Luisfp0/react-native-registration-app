import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'

const url = 'https://uylqvgibghcxaotkckfd.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5bHF2Z2liZ2hjeGFvdGtja2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3MzM2MzEsImV4cCI6MjAxNTMwOTYzMX0.UPEI9mkAiBahlKGgJ9Tuiq7bIgruuFQx569v0Bkfc4k'

// Initialize the Supabase client
export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,
    detectSessionInUrl: false,
  },
})
