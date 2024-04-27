'use client'
// import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Line, Area, PolarArea, Chart as ChartJS, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function AvoidedEmissionsGraph() {
    const { userData, projectList, setProjectList, selectedProject, setSelectedProject } = useAuth();


    const [emissionGraphData, setEmissionGraphData] = useState([]);
    const [transformedData, setTransformedData] = useState({});


    useEffect(() => {
        getGraphData();

    }, [])

    useEffect(() => {
        getGraphData();
    }, [selectedProject])

    useEffect(() => {

        const data = emissionGraphData;

        const transformedData = {
            "mes": data?.meses?.map(item => item.mes),
            "agua": data?.meses?.map(item => item.emissaoAgua),
            "gas": data?.meses?.map(item => item.emissaoGas),
            "energiaEletrica": data?.meses?.map(item => item.emissaoEnergiaEletrica),
            "residuos": data?.meses?.map(item => item.emissaoResiduos)
        }

        setTransformedData(transformedData);

        
    },[emissionGraphData])

    const getGraphData = async () => {
        const data = selectedProject

        try {
            const response = await fetch('http://191.252.38.35:8080/api/emissoesMensal/listarRelatorioSemestralEspecificoPorProjeto?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                setEmissionGraphData(data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

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

    const options2 = {
        plugins: {
            title: {
                display: true,
                text: 'Emissões evitadas no ultimo semestre',
                padding: {
                    top: 10,
                    bottom: 10
                },
                
            }
        }
    }

    const opt = {
        
        // labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        labels: transformedData?.mes,
        datasets: [
            {
                id: 1,
                label: 'Água',
                data: transformedData?.agua,
                backgroundColor: "#60A5FA",
            },
            {
                id: 2,
                label: 'Energia',
                data: transformedData?.energiaEletrica,
                backgroundColor: '#EF4444',
            },
            {
                id: 3,
                label: 'Resíduos',
                data: transformedData?.residuos,
                backgroundColor: '#22C55E',
            },
            {
                id: 4,
                label: 'Gás',
                data: transformedData?.gas,
                backgroundColor: '#6B7280',
            },
        ],
    }

    return (
        <>
            <Bar
                datasetIdKey='id'
                data={opt}
                options={options2}
                className="w-full h-96"
            />
        </>
    )
}

