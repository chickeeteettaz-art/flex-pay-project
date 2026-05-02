'use server'
import { createClient } from "@/lib/server";


export async function POST(req: Request) {

    try {
        const supabase = await createClient();
        const { email, password, accountNumber } = await req.json();

        // 1. Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithPassword ({
            email,
            password,
        });

        if (error) {
            return Response.json(
                { success: false, message: error.message },
                { status: 401 } // Unauthorized
            );
        }

        // 2. Get the user ID from the authenticated user
        const userId = data.user.id;
        console.log("User ID:", userId);

        // 3. Check if the account number matches the user's account
        const { data: userProfile, error: profileError } = await supabase
            .from('account') // Replace with your actual table name
            .select('account_number')
            .eq('user_id', userId)
            .single();

        console.log("User Profile:", userProfile);

        if (profileError) {
            return Response.json(
                { success: false, message: "Failed to verify account information" },
                { status: 500 }
            );
        }

        // 4. Verify the account number matches
        if (userProfile.account_number != accountNumber) {
            return Response.json(
                { success: false, message: "Account number does not match the email provided" },
                { status: 403 } // Forbidden
            );
        }

        // 5. Return the session/user data
        return Response.json(
            {
                success: true,
                message: "Login successful",
                user: data.user,
                accountNumber: userProfile.account_number
            },
            { status: 200 }
        );

    } catch (err) {
        console.error("Login error:", err);
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}