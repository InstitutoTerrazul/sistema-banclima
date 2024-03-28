'use client'
// import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Line, Area, PolarArea, Chart as ChartJS, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function AvoidedEmissionsGraph() {

    useEffect(() => {
        console.log('window', window);
    }, [])

    var options = {
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    };

    const opt = {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
                id: 1,
                label: 'Água',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
                id: 2,
                label: 'Energia',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
            {
                id: 3,
                label: 'Resíduos',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
            },
            {
                id: 4,
                label: 'Gás',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
            },
        ],
    }


    return (
        <>
            <Bar
                datasetIdKey='id'
                data={opt}
                className="w-full h-96"
            />
        </>
    )
}

