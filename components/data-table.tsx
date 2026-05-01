"use client"

import * as React from "react"
import { format, parseISO } from "date-fns"
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    GripVerticalIcon,
    EllipsisVerticalIcon,
    ChevronDownIcon,
    PlusIcon,
    ChevronsLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsRightIcon,
    Loader2
} from "lucide-react"

// Define the Payment Type
type Payment = {
    id: number
    created_at: string
    date: string
    amount: number
    currency: string
    payee_name: string
    account_number: string
    swift_code: string
    status: string
    account_id: number
    account?: {
        user_id: string
    }
}

const columns: ColumnDef<Payment>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
        enableHiding: false,
    },
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const dateStr = row.original.date
            if (!dateStr) return <span className="text-muted-foreground">—</span>

            try {
                return (
                    <div className="font-medium whitespace-nowrap">
                        {format(parseISO(dateStr), "dd MMM yyyy")}
                    </div>
                )
            } catch {
                return <div className="font-medium">{dateStr}</div>
            }
        },
    },
    {
        accessorKey: "payee_name",
        header: "Payee",
        cell: ({ row }) => <div className="font-medium">{row.original.payee_name}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => (
            <div className="text-right font-semibold tabular-nums">
                R {row.original.amount}
            </div>
        ),
    },
    {
        accessorKey: "account_number",
        header: "Account Number",
        cell: ({ row }) => (
            <div className="font-mono text-sm text-muted-foreground">
                {row.original.account_number}
            </div>
        ),
    },
    {
        accessorKey: "swift_code",
        header: "SWIFT",
        cell: ({ row }) => (
            <div className="font-mono text-sm uppercase tracking-wider">
                {row.original.swift_code}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <Badge
                    variant={
                        status === "Approved" || status === "Success" ? "default" :
                            status === "Pending" ? "secondary" : "destructive"
                    }
                    className="capitalize"
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="size-8">
                        <EllipsisVerticalIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Cancel Payment</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({ id })
    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:bg-transparent"
        >
            <GripVerticalIcon className="size-3" />
        </Button>
    )
}

function DraggableRow({ row }: { row: any }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    })

    return (
        <TableRow
            ref={setNodeRef}
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className="data-[dragging=true]:opacity-75"
        >
            {row.getVisibleCells().map((cell: any) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}

export function DataTable() {
    const [payments, setPayments] = React.useState<Payment[]>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })

    // Fetch Payments
    React.useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch("/api/payments")

                if (!response.ok) {
                    throw new Error(`Failed to fetch payments: ${response.status}`)
                }

                const data = await response.json()
                const payments = data.data
                setPayments(payments)
            } catch (err: any) {
                console.error("Error fetching payments:", err)
                setError(err.message || "Failed to load payments")
            } finally {
                setLoading(false)
            }
        }

        fetchPayments()
    }, [])

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    )

    const dataIds = React.useMemo(() => payments.map((item) => item.id), [payments])

    const table = useReactTable({
        data: payments,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setPayments((items) => {
                const oldIndex = dataIds.indexOf(active.id as number)
                const newIndex = dataIds.indexOf(over.id as number)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading payments...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-8 text-center">
                <p className="text-destructive font-medium">{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight py-4 px-4">Recent Payments</h2>
                <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Payment
                </Button>
            </div>

            <Tabs defaultValue="payments" className="w-full px-2 py-2">
                <TabsList>
                    <TabsTrigger value="payments">All Payments</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="payments" className="mt-6">
                    <div className="rounded-lg border">
                        <DndContext
                            collisionDetection={closestCenter}
                            modifiers={[restrictToVerticalAxis]}
                            onDragEnd={handleDragEnd}
                            sensors={sensors}
                        >
                            <Table>
                                <TableHeader className="sticky top-0 z-10 bg-muted">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                                        {table.getRowModel().rows.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <DraggableRow key={row.id} row={row} />
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                    No payments found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </SortableContext>
                                </TableBody>
                            </Table>
                        </DndContext>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between px-2 py-4">
                        <div className="text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronsLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronsRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}