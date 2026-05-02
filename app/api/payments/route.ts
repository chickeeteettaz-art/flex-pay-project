import { createClient } from '@/lib/server'
import { NextResponse } from 'next/server'



export async function POST(request: Request) {


    try {
        const supabase = await  createClient()
        const body = await request.json()
        const amount = parseFloat(body.amount)

        // 1. Get & Validate User
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        // 2. Get Account & Check Sufficient Funds
        const { data: account, error: accError } = await supabase
            .from('account')
            .select('id, balance')
            .eq('user_id', user.id)
            .single()

        if (accError || !account) return NextResponse.json({ error: 'Account not found' }, { status: 404 })
        if (account.balance < amount) return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 })



        // 3. Update Balance
        const { error: updateError } = await supabase
            .from('account')
            .update({ balance: account.balance - amount })
            .eq('id', account.id)

        if (updateError) throw new Error('Failed to update balance')

        // 4. Create Payment Record
        const { error: insertError } = await supabase
            .from('payment')
            .insert({
                account_id: account.id,
                amount: parseFloat(body.amount).toFixed(2),
                currency: body.currency,
                payee_name: body.payeeName,
                account_number: body.accountNumber,
                swift_code: body.swiftCode,
                status: 'Pending',
                date: body.date,
                created_at: new Date().toISOString()
            })

        // MANUAL ROLLBACK: If payment record fails, try to give the money back
        if (insertError) {
            console.error(insertError.message)
            await supabase
                .from('account')
                .update({ balance: account.balance })
                .eq('id', account.id)

            throw new Error('Payment record failed. Balance restored.')
        }

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Payment Error:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const supabase = await  createClient()
        // Verify user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) return NextResponse.json({ error: `Unauthorized ${user}` }, { status: 401 })

        // Use a join to fetch payments belonging to the user's account
        const { data, error } = await supabase
            .from('payment')
            .select('*, account!inner(user_id)')
            .eq('account.user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) throw error

        console.log("DATA:", data)
        return NextResponse.json({ success: true, data })

    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 })
    }
}


export async function PUT(request: Request) {
    try {
        const supabase = await  createClient()
        const body = await request.json()
        const { id, status } = body || {}
        console.log("BODY:", body.id, body.status)

        // Basic payload validation
        if (!id || !status) {
            return NextResponse.json({ error: 'Missing required fields: id, status' }, { status: 400 })
        }

        const allowedStatuses = ['Pending', 'Approved', 'Rejected'] as const
        if (!allowedStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
        }



        // Update status
        const { data: updated, error: updateError } = await supabase
            .from('payment')
            .update({ status })
            .eq('id', id)
            .select()
            .single()

        if (updateError) throw updateError

        return NextResponse.json({ success: true, data: updated })
    } catch (error) {
        console.error('Update Payment Status Error:', error)
        return NextResponse.json({ success: false, error }, { status: 500 })
    }
}







