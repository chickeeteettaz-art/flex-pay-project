"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPayment } from "@/lib/payment.actions";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Trash2, CheckCircle, ArrowLeft } from "lucide-react";

export default function PaymentDetails() {
    const { id } = useParams();           // Gets the dynamic [id] from URL
    const router = useRouter();

    const [payment, setPayment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Fetch payment when component mounts or id changes
    useEffect(() => {
        async function fetchPayment() {
            if (!id) return;

            setLoading(true);
            try {
                const data = await getPayment(id as string);   // Pass id as string
                if (data) {
                    setPayment(data);
                } else {
                    alert("Payment not found");
                }
            } catch (err: any) {
                console.error(err);
                alert("Failed to load payment details");
            } finally {
                setLoading(false);
            }
        }

        fetchPayment();
    }, [id]);

    const updatePaymentStatus = async (newStatus: 'Pending' | 'Approved' | 'Rejected') => {
        if (!payment) return;
        setActionLoading(true);
        try {
            const res = await fetch('/api/payments', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: payment.id, status: newStatus }),
            });

            const json = await res.json().catch(() => ({}));
            if (!res.ok || json?.success === false) {
                const msg = json?.error?.message || json?.error || 'Failed to update payment status';
                throw new Error(msg);
            }

            // Update local state with the returned record if available, else just set the status
            const updated = json?.data ?? { ...payment, status: newStatus };
            setPayment(updated);

            alert(`Payment ${newStatus.toLowerCase()} successfully.`);
        } catch (e: any) {
            console.error(e);
            alert(e?.message || 'Failed to update payment status');
        } finally {
            setActionLoading(false);
        }
    };

    const handleApprove = async () => updatePaymentStatus('Approved');
    const handleReject = async () => updatePaymentStatus('Rejected');

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!payment) {
        return (
            <div className="container py-10 text-center">
                <h2 className="text-2xl font-semibold">Payment not found</h2>
            </div>
        );
    }

    return (
        <div className="container max-w-2xl py-10">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6 -ml-4 text-muted-foreground"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Payments
            </Button>

            <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">Payment Details</CardTitle>
                            <CardDescription>Ref ID: #{payment.id}</CardDescription>
                        </div>
                        <Badge
                            variant={payment.status === 'Pending' ? 'outline' : 'default'}
                            className={payment.status === 'Pending'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                : 'bg-green-600'
                            }
                        >
                            {payment.status}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                    {/* Main Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-tight">Payee</p>
                            <p className="text-lg font-semibold">{payment.payee_name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-tight">Amount</p>
                            <p className="text-2xl font-bold text-primary">
                                {payment.amount.toLocaleString()}
                                <span className="text-sm font-normal">{payment.currency}</span>
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Banking Details */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <DetailRow label="Account Number" value={payment.account_number} mono />
                        <DetailRow label="SWIFT/BIC" value={payment.swift_code} mono />
                        <DetailRow label="Value Date" value={new Date(payment.date).toLocaleDateString('en-GB')} />
                        <DetailRow label="Submitted At" value={new Date(payment.created_at).toLocaleString()} />
                    </div>
                </CardContent>

                <CardFooter className="bg-muted/10 border-t p-6 flex gap-3 justify-end">


                    {payment.status === 'Pending' && (
                        <>
                            <Button
                                onClick={handleReject}
                                disabled={actionLoading}
                                variant="outline"
                                className="text-destructive border-destructive hover:bg-destructive/10"
                            >
                                {actionLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="mr-2 h-4 w-4" />
                                )}
                                Reject Payment
                            </Button>

                            <Button
                                onClick={handleApprove}
                                disabled={actionLoading}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {actionLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                )}
                                Approve Payment
                            </Button>
                        </>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

function DetailRow({ label, value, mono = false }: {
    label: string;
    value: string | number;
    mono?: boolean
}) {
    return (
        <div>
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">{label}</p>
            <p className={`text-sm font-medium ${mono ? 'font-mono bg-muted/50 px-2 py-1 rounded-sm inline-block' : ''}`}>
                {value}
            </p>
        </div>
    );
}