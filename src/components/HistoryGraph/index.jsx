'use client'
// import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Line, Area, PolarArea, Chart as ChartJS, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// import { CategoryScale, Chart, LinearScale, Point, PointElement } from "chart.js";

// Chart.register(CategoryScale,LinearScale, PointElement, Point );
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function HistoryGraph() {

    const { userData, selectedProject, setSelectedProject } = useAuth();


    const [graphData, setGraphData] = useState([]);
    const [transformedData, setTransformedData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        getGraphData();
        setIsLoaded(true);

    }, [])

    useEffect(() => {
        getGraphData();
    }, [selectedProject])

    useEffect(() => {

        const data = graphData;

        const transformedData = {
            "mes": data.map(item => item.mes),
            "emissao": data.map(item => item.emissao)
        };

        setTransformedData(transformedData);

    }, [graphData])

    const getGraphData = async () => {
        const data = selectedProject

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/emissoesMensal/listarRelatorioSemestralPorProjeto?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                setGraphData(data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }


    const options = {
        chart: {
            type: 'area',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
        },
        dataLabels: {
            enabled: false
        },
        menu: {
            enabled: false
        },
        series: [{
            name: 'area',
            data: transformedData?.emissao
        }],
        xaxis: {
            categories: transformedData?.mes
        },
        title: {
            text: 'Historico de Emissões semestrais',
            align: 'left',
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
            },
        },
    }

    const options2 = {
        plugins: {
            title: {
                display: true,
                text: 'Historico de Emissões semestrais',
                padding: {
                    top: 10,
                    bottom: 10
                },

            }
        }
    }

    const opt = {
        labels: transformedData?.mes,
        datasets: [
            {
                id: 1,
                label: 'Emissões',
                data: transformedData?.emissao,
                fill: true
            },
        ],
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }

    return (
        <>
            <Line
                datasetIdKey='id'
                data={opt}
                options={options2}
                className="w-full lg:w-[calc(100%/2-20px)] h-96"
            />
        </>
    )
}