"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator} from "@/components/ui/field";
import { ChartNoAxesCombined } from "lucide-react";
import { cn } from "@/lib/utils";

const resetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    accountNumber: z
        .string()
        .min(1, { message: "Account number is required" })
        .length(16, { message: "Account number must have exactly 16 digits" })
        .regex(/^\d+$/, { message: "Account number must only contain digits" }),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
            accountNumber: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        console.log("Reset Password Data:", data);
        // TODO: Call your API here (e.g. supabase or custom endpoint)
        // Example: await resetPasswordApi(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-muted/40">
            <div className={"w-full max-w-4xl"}>
                <Card className="overflow-hidden p-0 shadow-xl">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        {/* Form Side */}
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup className="space-y-6">
                                {/* Header */}
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <ChartNoAxesCombined className="h-12 w-12 text-primary" />
                                    <h1 className="text-2xl font-bold">Flex Pay Password Reset</h1>
                                    <p className="text-balance text-muted-foreground">
                                        Please enter your details to reset your password.
                                    </p>
                                </div>

                                {/* Email Field */}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="email">Email Address</FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="email"
                                                placeholder="name@example.com"
                                                required
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Account Number Field */}
                                <Controller
                                    name="accountNumber"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="accountNumber">Account Number</FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="text"
                                                placeholder="1234 5678 9101 1213"
                                                required
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? "Processing..." : "Reset Password"}
                                </Button>

                                {/* Separator */}
                                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                    OR
                                </FieldSeparator>

                                {/* Back to Sign In */}
                                <FieldDescription className="text-center">
                                    Go back to{" "}
                                    <a href="/login" className="text-primary hover:underline">
                                        Sign In
                                    </a>
                                </FieldDescription>
                            </FieldGroup>
                        </form>

                        {/* Image Side */}
                        <div className="relative hidden bg-muted md:block">
                            <img
                                src="/login_back.jpg"
                                alt="Secure password reset illustration"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </CardContent>
                </Card>

            </div>

        </div>
    );
}

