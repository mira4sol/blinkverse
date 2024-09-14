import { createClient } from '@supabase/supabase-js'
import { ENV } from './constants/env.constant'

export const supabaseClient = createClient(
  ENV.SUPABASE_URL || '',
  ENV.SUPABASE_KEY || ''
)
