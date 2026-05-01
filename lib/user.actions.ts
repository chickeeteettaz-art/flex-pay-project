import {supabase} from '@/lib/client'

export const getUserFunction = async () => {
     await supabase.auth.getUser()
}