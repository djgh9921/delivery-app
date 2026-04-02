import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_KEY

if (!url || !key) {
    throw new Error('Supabase env variables are missing')
}

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
)