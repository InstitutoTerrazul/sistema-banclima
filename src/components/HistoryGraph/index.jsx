'use client'
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function HistoryGraph() {


    const options = {
        chart: {
            type: 'line'
        },
        series: [{
            name: 'area',
            data: [30, 40, 35, 50, 77, 60]
        }],
        xaxis: {
            categories: ["outubro", "novembro", "dezembro", "janeiro", "fevereiro", "março"]
        }
    }

    const series = [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]

    return (
        <>
            <Chart
                options={options}
                series={options.series}
                type="line"
                width={"100%"}
                height={350}
                className="w-full h-96"
            />
        </>
    )
}