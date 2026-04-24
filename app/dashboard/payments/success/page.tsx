"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[400px] text-center shadow-xl">
        <CardContent className="p-6">

          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-2">
            Payment Successful 
          </h2>

          <p className="text-gray-600 mb-4">
            Your international payment has been submitted successfully.
          </p>

          <div className="bg-gray-50 p-3 rounded mb-4">
            <p className="text-sm">
              Status: <span className="text-yellow-600 font-semibold">
                Pending Verification
              </span>
            </p>
          </div>

          <Button onClick={() => router.push("/dashboard/payments")}>
            Make New Payment
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}