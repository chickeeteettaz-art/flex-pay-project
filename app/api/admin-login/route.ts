"use server"
import { supabase } from "@/lib/client";

export async function POST(req: Request) {
    try {
        const { email, password,} = await req.json();

        // 1. Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
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

        // 5. Return the session/user data
        return Response.json(
            {
                success: true,
                message: "Login successful",
                user: data.user,
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