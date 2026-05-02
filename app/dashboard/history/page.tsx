import React from 'react'
import {ChartAreaInteractive} from "@/components/chart-area-interactive";
import {DataTable} from "@/components/data-table";

const Page = () => {
    return (
        <>
            <div className={'px-4 py-4 text-lg font-semibold'}>Payment History and Analytics</div>
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
            <DataTable />
        </>

    )
}
export default Page
