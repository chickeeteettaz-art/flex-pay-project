"use client"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import {useEffect, useState} from "react";
import {supabase} from "@/lib/client";




export function SiteHeader() {
    const [username, setUsername] = useState("")
    useEffect(() => {
        async function getDashboardData() {
            // 1. Get the authenticated user
            const {data: {user}, error: authError} = await supabase.auth.getUser()

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
                    .select('balance, account_number,full_name')
                    .eq('user_id', userId)
                    .single(),
            ])
            setUsername(accountRes.data?.full_name);
        }
        getDashboardData()
    }, [])
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-medium">{username}</h1>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

