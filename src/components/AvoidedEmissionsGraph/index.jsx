'use client'
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Bar } from 'react-chartjs-2';
export default function AvoidedEmissionsGraph() {
    const { userData, selectedProject} = useAuth();

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


    }, [emissionGraphData])

    useEffect(() => {
        transformDataForGraph();
    }, [emissionGraphData])


    const transformDataForGraph = () => {
        const data = emissionGraphData;

        const meses = data?.meses?.map(item => item.mes);
        const agua = data?.meses?.map(item => item.emissaoAgua);
        const gas = data?.meses?.map(item => item.emissaoGas);
        const energiaEletrica = data?.meses?.map(item => item.emissaoEnergiaEletrica);
        const residuos = data?.meses?.map(item => item.emissaoResiduos);

        const sortedMeses = meses?.sort((a, b) => {
            const [mesA, anoA] = a.split('/');
            const [mesB, anoB] = b.split('/');
            return new Date(anoA, mesA) - new Date(anoB, mesB);
        });

        setTransformedData({
            mes: sortedMeses,
            agua,
            gas,
            energiaEletrica,
            residuos
        });
    }

    const getGraphData = async () => {
        if (selectedProject === undefined) {
            return;
        }

        if (userData.login === undefined) {
            return;
        }

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/emissoesMensal/listarRelatorioSemestralEspecificoPorProjeto?login=${userData.login}&senha=${userData.senha}&projeto=${selectedProject}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    const options2 = {
        plugins: {
            title: {
                display: true,
                text: 'Emissões evitadas no último semestre',
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

