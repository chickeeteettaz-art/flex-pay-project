"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  DollarSign,
  CreditCard,
  User,
  Globe,
  Landmark,
} from "lucide-react";


const paymentSchema = z.object({
  amount: z.string().regex(/^\d{1,6}$/, "Amount must be max 6 digits"),

  currency: z.enum(["USD", "EUR", "GBP", "ZAR"], {
    message: "Select a currency",
  }),

  accountNumber: z
    .string()
    .regex(/^\d{16}$/, "Account number must be exactly 16 digits"),

  swiftCode: z
    .string()
    .regex(
      /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
      "Invalid SWIFT format"
    ),

  payeeName: z.string().min(2, "Payee name is required"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function Payment() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  
  const onSubmit = (data: PaymentFormData) => {
    console.log("Payment Data:", data);

    
    setTimeout(() => {
      router.push("/dashboard/payments/success");
    }, 800);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <Card className="w-[420px] shadow-xl rounded-2xl">
        <CardContent className="p-6">

         
          <h2 className="text-2xl font-bold mb-6">
            Payment Form
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            
            <div>
              <Label>Amount</Label>
              <div className="flex items-center border rounded px-2 mt-1">
                <DollarSign className="text-gray-500" size={18} />
                <Input
                  className="border-none focus-visible:ring-0 bg-transparent"
                  placeholder="1000"
                  {...register("amount")}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm">
                  {errors.amount.message}
                </p>
              )}
            </div>

           
            <div>
              <Label>Currency</Label>
              <div className="flex items-center border rounded px-2 mt-1">
                <Globe className="text-gray-500" size={18} />
                <select
                  {...register("currency")}
                  className="w-full p-2 outline-none"
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="ZAR">ZAR</option>
                </select>
              </div>
              {errors.currency && (
                <p className="text-red-500 text-sm">
                  {errors.currency.message}
                </p>
              )}
            </div>

            
            <div>
              <Label>Payee Name</Label>
              <div className="flex items-center border rounded px-2 mt-1">
                <User className="text-gray-500" size={18} />
                <Input
                  className="border-none focus-visible:ring-0 bg-transparent"
                  placeholder="Enter name"
                  {...register("payeeName")}
                />
              </div>
              {errors.payeeName && (
                <p className="text-red-500 text-sm">
                  {errors.payeeName.message}
                </p>
              )}
            </div>

           
            <div>
              <Label>Account Number</Label>
              <div className="flex items-center border rounded px-2 mt-1">
                <CreditCard className="text-gray-500" size={18} />
                <Input
                  className="border-none focus-visible:ring-0 bg-transparent"
                  placeholder="16-digit account number"
                  {...register("accountNumber")}
                />
              </div>
              {errors.accountNumber && (
                <p className="text-red-500 text-sm">
                  {errors.accountNumber.message}
                </p>
              )}
            </div>

            
            <div>
              <Label>SWIFT Code</Label>
              <div className="flex items-center border rounded px-2 mt-1">
                <Landmark className="text-gray-500" size={18} />
                <Input
                  className="border-none focus-visible:ring-0 bg-transparent"
                  placeholder="ABCDZAJJ"
                  {...register("swiftCode")}
                />
              </div>
              {errors.swiftCode && (
                <p className="text-red-500 text-sm">
                  {errors.swiftCode.message}
                </p>
              )}
            </div>

            
            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Pay Now"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}