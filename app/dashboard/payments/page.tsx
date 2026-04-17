import React from 'react'

import Link from "next/link";
import {Button} from "@/components/ui/button";

const Page = () => {
    return (
        <div>
            <Link href="/dashboard/payments/success">
                <Button>Make Payment</Button>
            </Link>

        </div>
    )
}
export default Page
