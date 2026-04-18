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


export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Account Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R17,250.00
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
            4473 2190 893

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
             - R9 600.00
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
            239
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
            56%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={'px-4 py-1.5'}>
              <Activity
              />
              +56%
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
