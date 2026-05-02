"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
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


  const ADMIN = {
    email: "admin@bank.com",
    password: "Admin123!",
  };

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    console.log("Login Attempt:", data);

    if (data.email === ADMIN.email && data.password === ADMIN.password) {
      
      router.push("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }

    form.reset();
  };

  return (
    <div className={cn("flex items-center justify-center min-h-screen bg-gray-100")}>

      <Card className="w-[400px] shadow-xl rounded-2xl">
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
                      placeholder="admin@bank.com"
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

              

            </FieldGroup>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}