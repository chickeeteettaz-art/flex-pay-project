import {createClient} from "@/lib/client";
const supabase = createClient();

export const getPayment = async (paymentId:string) => {

    const {data, error} = await supabase
        .from('payment')
        .select('*')
        .eq('id', paymentId)
        .single()

    if (error) throw error

    return data
}

export const getAllPayments = async () => {
    const {data, error} = await supabase
        .from('payment')
        .select('*')
    if (error) throw error
    return data
}