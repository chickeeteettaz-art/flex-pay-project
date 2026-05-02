"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {TrendingUpIcon, TrendingDownIcon, HandCoins, CreditCard, Activity} from "lucide-react"
import { useEffect, useState } from "react"
import {createClient} from "@/lib/client";
const supabase = createClient();


export function SectionCards() {

    const [data, setData] = useState({
        balance: 0,
        paymentCount: 0,
        totalPaymentsValue: 0,
        accountNumber: "",
        loading: true
    })

    useEffect(() => {
        async function getDashboardData() {
            // 1. Get the authenticated user
            const { data: { user }, error: authError } = await supabase.auth.getUser()

            if (authError || !user) {
                console.error("Auth error:", authError)
                return
            }

            const userId = user.id

            // 2. Run queries in parallel for better performance
            const [accountRes] = await Promise.all([
                // Get account details
                supabase
                    .from('account')
                    .select('balance, account_number,id')
                    .eq('user_id', userId)
                    .single(),


            ])
            const {data, error} = await supabase
                .from('payment')
                .select('amount')
                .eq('account_id', accountRes.data?.id)

            const totalSum = data?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0

            setData({
                balance: accountRes.data?.balance ?? 0,
                accountNumber: accountRes.data?.account_number ?? "N/A",
                totalPaymentsValue: totalSum,
                paymentCount: data?.length ?? 0,
                loading: false
            })
        }

        getDashboardData()
    }, [])
    const accountPerformance = ((data.totalPaymentsValue / data.balance) * 100).toFixed(2)

    if (data.loading) return <div>Loading...</div>


    return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Account Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R {data.balance.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className='px-4 py-1.5'>
              <HandCoins
               className="size-10"/>

            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
              <CreditCard className="size-4"/>
              {data.accountNumber ? `${data.accountNumber}` : "N/A"}

          </div>
          <div className="text-muted-foreground">
            Current Account Balance
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Payments</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
             - R {(data.totalPaymentsValue.toFixed(2))}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={'px-4 py-1.5'}>
              <TrendingDownIcon
              />

            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Account payments
            <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total amount of payments made
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Transactions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {data.paymentCount}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={'px-4 py-1.5'}>
              <TrendingUpIcon
              />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Increase in transactions
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Monthly payment rate increasing</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Account Performance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {accountPerformance}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={'px-4 py-1.5'}>
              <Activity
              />
              +{accountPerformance}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase{" "}
            <Activity className="size-4" />
          </div>
          <div className="text-muted-foreground">Account management growing</div>
        </CardFooter>
      </Card>
    </div>
  )
}
