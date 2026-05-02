"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    LayoutDashboardIcon,
    ListIcon,
    ChartBarIcon,
    CameraIcon,
    FileTextIcon,
    Settings2Icon,
    CircleHelpIcon,
    SearchIcon,
    DatabaseIcon,
    ChartNoAxesCombined, FileChartColumnIcon
} from "lucide-react"
import Link from "next/link";
import {useEffect, useState} from "react";
import {createClient} from "@/lib/client";
const supabase = createClient();
import {NavAdmin} from "@/components/nav-admin";


const data = {

    navMain: [
        {
            title: "Dashboard",
            url: "/admin-dashboard",
            icon: (
                <LayoutDashboardIcon
                />
            ),
        },
        {
            title: "Payments",
            url: "/admin-dashboard/payments",
            icon: (
                <ListIcon
                />
            ),
        },


    ],
    navClouds: [
        {
            title: "Capture",
            icon: (
                <CameraIcon
                />
            ),
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: (
                <FileTextIcon
                />
            ),
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: (
                <FileTextIcon
                />
            ),
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [

    ],
    documents: [

    ],
}
export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [username, setUsername] = useState<any>("")
    const [email, setEmail] = useState<any>("")
    const [currentUser,setUser] = useState<any>()
    useEffect(() => {
        async function getDashboardData() {
            // 1. Get the authenticated user
            const {data: {user}, error: authError} = await supabase.auth.getUser()

            if (authError || !user) {
                console.error("Auth error:", authError)
                return
            }

            const userId = user.id



            setUsername(user.email);
            setEmail(user.email)
        }
        getDashboardData()
    }, [])

    const user = {
        name:username,
        email: email,
        avatar: ""
    }
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                            render={<Link href="/dashboard" />}
                        >
                            <ChartNoAxesCombined className="size-10!" />
                            <span className="text-base font-semibold">Flex Pay</span>

                        </SidebarMenuButton>
                        <span className="text-sm">International Payments</span>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavAdmin items={data.navMain} />
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
