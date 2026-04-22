"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { z } from "zod"
import {ChartNoAxesCombined, Eye, EyeOff} from "lucide-react";
import {useState} from "react";

interface UserSchemaTypes {
  email:string,
  accountNumber:string,
  password:string
}



const userSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .max(100)
    .email({ message: 'Please enter a valid Email address' }),

  accountNumber: z
    .string()
    .min(1, { message: 'Account number is required' })
    .length(16, { message: 'Account number must have exactly 16 digits' })
    .regex(/^\d+$/, { message: 'Account number must only contain digits' }),

  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' })
    .regex(/[a-z]/, { message: 'Password must have at least one small letter' })
    .regex(/[A-Z]/, { message: 'Password must have at least one big letter' })
    .regex(/[0-9]/, { message: 'Password must have at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must have at least one special character' }),
})

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

    const [showPassword,setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      accountNumber: "",
      password: ""
    },
    mode: "all"
  })


const onSubmit = (data: z.infer<typeof userSchema>) => {

  console.log(data)
  form.reset()

}
  
  return (

    
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>


              <div className="flex flex-col items-center gap-2 text-center">
                  <ChartNoAxesCombined className="h-12 w-12 text-primary"/>
                  <h1 className="text-2xl font-bold">Flex Pay Login</h1>
                <p className="text-balance text-muted-foreground">
                  Please enter your details to login.
                </p>
              </div>

              <Controller
                name="email"
                control={form.control}
                render={({field,fieldState}) =>(
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        {...field}
                        area-invalid={(fieldState.invalid).toString()}
                        id={field.name}
                        type="email"
                        placeholder="name@gmail.com"
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]}/>
                      )}
                    </Field>
                )}
              />


              <Controller
                name="accountNumber"
                control={form.control}
                render={({field,fieldState}) =>(
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="accountNumber">Account Number</FieldLabel>
                      <Input
                        {...field}
                        area-invalid={(fieldState.invalid).toString()}
                        id={field.name}
                        type="text"
                        placeholder="1234 5678 9101 1213"
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]}/>
                      )}
                    </Field>
                )}
              />

                <Controller
                    name="password"
                    control={form.control}
                    render={({field,fieldState}) =>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">Password</FieldLabel>

                            <div className="relative">
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id={field.name}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    required
                                    className="pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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

                <Button type="submit">Login</Button>


              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                OR
              </FieldSeparator>


              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/signup">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/login_back.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover m-5"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Flex Pay online payment system. Powered by Swift.
      </FieldDescription>
    </div>
  )
}

