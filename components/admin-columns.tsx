'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type Payment = {
    id: number;
    created_at: string;
    amount: number;
    currency: string;
    payee_name: string;
    date: string;
    status: 'Pending' | 'Completed' | 'Failed';
    swift_code: string;
    account_number: string;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div className="font-mono text-sm">#{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'payee_name',
        header: 'Payee',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const currency = row.original.currency;
            return (
                <div className="font-medium">
                    R {amount.toFixed(2)}
                </div>
            );
        },
    },
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => {
            return <div>{format(new Date(row.getValue('date')), 'dd MMM yyyy')}</div>;
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            return (
                <Badge
                    variant={
                        status === 'Approved'
                            ? 'default'
                            : status === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                    }
                    className="capitalize"
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        header: '',
        cell: () => <div className="text-right text-xs text-muted-foreground">View details →</div>,
    },
];