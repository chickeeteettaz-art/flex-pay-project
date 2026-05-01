"use client"
import { DataTable } from '@/components/admin-payment-table';
import { columns } from '@/components/admin-columns';
import {getAllPayments} from "@/lib/payment.actions";
import {useEffect, useState} from "react";



export default function PaymentsPage() {

    const [payments, setPayments] = useState<any[]>([])

    useEffect(()=>{
        getAllPayments()
            .then((data)=>{
                setPayments(data)
            })
    },[])
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Payments</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage and track all your transactions
                    </p>
                </div>
            </div>

            <DataTable columns={columns} data={payments} />
        </div>
    );
}