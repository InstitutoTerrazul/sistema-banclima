'use client'
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function HistoryGraph() {
    const [graphData, setGraphData] = useState([]);
    const [transformedData, setTransformedData] = useState({});

    useEffect(() => {
        getGraphData();
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
            const response = await fetch('http://191.252.38.35:8080/api/emissoesMensal/listarRelatorioSemestralPorProjeto?login=terrazul&senha=1234567', {
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

    return (
        <>
            {(typeof window !== 'undefined') ?
                <Chart
                    options={options}
                    series={options.series}
                    type="area"
                    width={"100%"}
                    height={350}
                    className="w-full h-96"
                /> : null
            }
        </>
    )
}