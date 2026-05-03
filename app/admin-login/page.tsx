"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {redirect, useRouter} from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field, FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { ChartNoAxesCombined, Eye, EyeOff } from "lucide-react";


const userSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email" }),

    password: z
        .string()
        .min(8, { message: "Minimum 8 characters" })
        .regex(/[a-z]/, { message: "Must include lowercase" })
        .regex(/[A-Z]/, { message: "Must include uppercase" })
        .regex(/[0-9]/, { message: "Must include number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Must include special character" }),
});

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
    });


    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);


    const onSubmit = async (data: z.infer<typeof userSchema>) => {

        const email = data.email;
        if (!email.includes("03751@flex.co.za")) {
            alert("You are not authorized to login");
            redirect("/login");
        }
        try {
            const response = await fetch("/api/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                // Handle specific auth errors from Supabase
                throw new Error(result.message || "Invalid email or password");
            }

            // Success! Clear form and redirect
            form.reset();
            router.push("/admin-dashboard");
            router.refresh();

        } catch (err: any) {
            setServerError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10")}>
            <div className="w-full max-w-md">
                <Card className="shadow-md rounded-2xl">
                    <CardContent className="p-6">

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>


                            <div className="flex flex-col items-center gap-2 text-center mb-4">
                                <ChartNoAxesCombined className="h-12 w-12 text-primary" />
                                <h1 className="text-2xl font-bold">Flex Pay Admin Login</h1>
                                <p className="text-muted-foreground">
                                    Enter admin credentials
                                </p>
                            </div>


                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            type="email"
                                            placeholder="Enter valid Email Address"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />


                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Password</FieldLabel>

                                        <div className="relative">
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter password"
                                                className="pr-10"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />


                            <Button type="submit" className="w-full mt-4">
                                Login
                            </Button>



                            <FieldDescription className="text-center">
                                Login As User <a href="/login">User Login</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}