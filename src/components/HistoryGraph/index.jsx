'use client'
// import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Line, Area, PolarArea, Chart as ChartJS, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// import { CategoryScale, Chart, LinearScale, Point, PointElement } from "chart.js";

// Chart.register(CategoryScale,LinearScale, PointElement, Point );
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function HistoryGraph() {
    const [graphData, setGraphData] = useState([]);
    const [transformedData, setTransformedData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getGraphData();
        setIsLoaded(true);

    }, [])

    useEffect(() => {

        const data = graphData;

        const transformedData = {
            "mes": data.map(item => item.mes),
            "emissao": data.map(item => item.emissao)
        };

        console.log('dados transformados:', transformedData);
        setTransformedData(transformedData);

    }, [graphData])

    const getGraphData = async () => {
        const data = "projeto 1"

        try {
            const response = await fetch('https://191.252.38.35:8443/api/emissoesMensal/listarRelatorioSemestralPorProjeto?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Grafico de historico:', data);
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
            },
        ],
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }

    return (
        <>
            {/* {window &&

                <Chart
                    options={options}
                    series={options.series}
                    type="area"
                    width={"100%"}
                    height={350}
                    className="w-full h-96"
                />
            } */}
            <Line
                datasetIdKey='id'
                data={opt}
                options={options2}
                className="w-full h-96"
            />
        </>
    )
}