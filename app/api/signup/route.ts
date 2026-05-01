"use server"
import { supabase } from "@/lib/client";

export async function POST(req: Request) {


    try {
        const body = await req.json();

        const { email, password, fullName, idNumber, accountNumber } = body;

        const { data: authData, error: authError } =
            await supabase.auth.signUp({
                email,
                password,
            });

        if (authError) {
            console.error("AUTH ERROR:", authError);
            return Response.json(
                { success: false, message: authError.message },
                { status: 400 }
            );
        }

        const userId = authData.user?.id;

        const { data, error } = await supabase
            .from("account")
            .insert([
                {

                    user_id: userId,
                    email,
                    full_name: fullName,
                    id_number: idNumber,
                    account_number: accountNumber,
                    balance: 0.0,
                },
            ])
            .select();



        if (error) {
            console.error("DATABASE ERROR:", error);
            return Response.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        return Response.json(
            { success: true, message: "User created", data },
            { status: 200 }
        );
    } catch (err) {
        console.error("SERVER ERROR:", err);

        return Response.json(
            { success: false, message: err },
            { status: 500 }
        );
    }
}