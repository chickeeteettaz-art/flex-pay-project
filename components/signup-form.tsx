"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription, FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {z} from "zod"
import {toast} from "sonner"
import {useState} from "react";
import {ChartNoAxesCombined, Eye, EyeOff} from "lucide-react";





// implementation of zod schema
const userFormSchema = z.object({

  fullName:z
      .string()
      .min(1, { message: 'Fullname is required' })
      .max(50,{ message: '50 characters allowed' }),

  idNumber:z.
      string()
      .min(1, { message: 'ID number is required' })
      .max(13,{message:'13 characters allowed'})
      .regex(/^\d+$/, { message: 'ID number must only contain digits' }),

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


  confirmPassword: z
      .string()
      .min(8, { message: 'Confirm Password must have at least 8 characters' })
      .regex(/[a-z]/, { message: 'Confirm Password must have at least one small letter' })
      .regex(/[A-Z]/, { message: 'Confirm Password must have at least one big letter' })
      .regex(/[0-9]/, { message: 'Confirm Password must have at least one number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Confirm Password must have at least one special character' })

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [showRequirements, setShowRequirements] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues:{
      fullName:"",
      idNumber: "",
      accountNumber: "",
      email:"",
      password: "",
      confirmPassword: ""
    },
    mode:"onChange"
  })

  const handleSubmit = (values: z.infer<typeof userFormSchema>) => {
    console.log(values);
  }
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-4">
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                  <ChartNoAxesCombined className="h-12 w-12 text-primary"/>
                  <h1 className="text-2xl font-bold">Flex Pay Registration</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your details below to create your account
                </p>
              </div>
              <Controller
                  name="fullName"
                  control={form.control}
                  render={({field,fieldState}) =>(
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Fullname</FieldLabel>
                        <Input
                            {...field}
                            area-invalid={(fieldState.invalid).toString()}
                            id={field.name}
                            type="text"
                            placeholder="Enter full name"
                            required
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]}/>
                        )}
                      </Field>
                  )}
              />

              <Controller
                  name="idNumber"
                  control={form.control}
                  render={({field,fieldState}) =>(
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="idNumber">ID Number</FieldLabel>
                        <Input
                            {...field}
                            area-invalid={(fieldState.invalid).toString()}
                            id={field.name}
                            type="text"
                            placeholder="Enter ID Number"
                            required
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]}/>
                        )}
                      </Field>
                  )}
              />

              <Controller
                  name="email"
                  control={form.control}
                  render={({field,fieldState}) =>(
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email Address</FieldLabel>
                        <Input
                            {...field}
                            area-invalid={(fieldState.invalid).toString()}
                            id={field.name}
                            type="text"
                            placeholder="Enter Email Address"
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
                            placeholder="Enter Account Number"
                            required
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]}/>
                        )}
                      </Field>
                  )}
              />



            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({field,fieldState}) =>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>

                            <div className="relative">
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id={field.name}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    required
                                    className="pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />


            </div>
                <div className="flex items-center justify-between mt-2">
                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => {
                            const next = !showRequirements;
                            setShowRequirements(next);

                            if (next) {
                                toast("Password Requirements", {
                                    description:
                                        "• At least 8 characters\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character",
                                    duration: 5000,
                                });
                            }
                        }}
                    >
                        {showRequirements ? "Hide requirements" : "Show password requirements"}
                        {showRequirements && (
                            <div className="mt-2 rounded-md border p-3 text-sm bg-muted shadow-sm">
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>At least 8 characters</li>
                                    <li>One uppercase letter</li>
                                    <li>One lowercase letter</li>
                                    <li>One number</li>
                                    <li>One special character</li>
                                </ul>
                            </div>
                        )}
                    </button>
                </div>


              <Field>
                <Button type="submit">Create Account</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                OR
              </FieldSeparator>

              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>

        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Flex pay online payment service. Powered by Swift

      </FieldDescription>
    </div>
  )
}
