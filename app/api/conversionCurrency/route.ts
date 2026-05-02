import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // 1. Extract parameters from the URL (e.g., /api/convert?base=USD&target=EUR&amount=100)
        const { searchParams } = new URL(request.url);
        const base_code = searchParams.get('base');
        const targetCode = searchParams.get('target');
        const amount = searchParams.get('amount');

        // Validation: Ensure all parameters are present
        if (!base_code || !targetCode || !amount) {
            return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
        }

        const API_KEY = process.env.EXCHANGE_RATE_KEY;

        if (!API_KEY) {
            return NextResponse.json({ error: 'API Key is missing on server' }, { status: 500 });
        }

        const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${base_code}/${targetCode}/${amount}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result === "error") {
            return NextResponse.json({ error: data['error-type'] }, { status: 400 });
        }

        return NextResponse.json({
            convertedAmount: data.conversion_result,
            rate: data.conversion_rate,
            lastUpdated: data.time_last_update_utc
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}