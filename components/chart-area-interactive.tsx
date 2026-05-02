"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {useEffect, useState} from "react";

export const description = "An interactive area chart"




interface Payment {
    created_at: string;
    account_id: string;
    amount: number;
    currency: string;
    swift_code: string;
    status: string;
    account_number: string;
    date: string;
    payee_name:string;
    id:number;
    account:{user_id:string}
}
interface Transaction {
    date: string;
    transaction: number;
}
const chartConfig = {
  payments: {
    label: "Payment",
  },
  transaction: {
    label: "Transaction",
    color: "var(--primary)",
  },

} satisfies ChartConfig

export function ChartAreaInteractive() {

    const [data, setData] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState("7d")

    useEffect(() => {
        async function getPayments() {
            try {
                const response = await fetch('/api/payments', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                if (!response.ok) throw new Error('Failed to fetch payments')

                const result = await response.json();

                // CRITICAL FIX: Access result.data because your API wraps the array
                // result = { success: true, message: "...", data: [...] }
                if (result.success && Array.isArray(result.data)) {
                    const formatted: Transaction[] = result.data.map((item: Payment) => ({
                        // Use item.date if that's your field, or item.created_at
                        date: item.date || item.created_at,
                        transaction: Number(item.amount) // Ensure it's a number for the chart
                    }));

                    // Sort data by date (ascending) so the chart lines draw correctly left-to-right
                    const sorted = formatted.sort((a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );

                    setData(sorted);
                } else {
                    throw new Error(result.message || "Invalid data format received");
                }
            } catch (error: any) {
                console.error("Fetch error:", error.message)
            } finally {
                setLoading(false)
            }
        }

        getPayments()
    }, [])

    useEffect(() => {
        if (isMobile) {
            setTimeRange("7d")
        }
    }, [isMobile])

    if (loading) return <div>Loading transaction data...</div>





  const filteredData = data.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2026-04-20")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Payments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total payments for the last 30 days
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={timeRange ? [timeRange] : []}
            onValueChange={(value) => {
              setTimeRange(value[0] ?? "90d")
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >

            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value !== null) {
                setTimeRange(value)
              }
            }}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">

              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="transaction"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
