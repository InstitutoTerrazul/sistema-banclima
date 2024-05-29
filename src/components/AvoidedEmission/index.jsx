import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";


export default function AvoidedEmission() {
    const [totalEmissionsAvoided, setTotalEmissionsAvoided] = useState([])

    const { selectedProject, setSelectedProject } = useAuth();


    useEffect(() => {
        getAvoidedEmissions()
    }, [])

    useEffect(() => {
        getAvoidedEmissions();
    }, [selectedProject])

    const emissions = [
        {
            title: 'Emissões de água Evitadas',
            value: totalEmissionsAvoided[0]?.emissoesEvitadas.toFixed(2),
            color: 'bg-blue-400'
        },
        {
            title: 'Emissões de energia Evitadas',
            value: totalEmissionsAvoided[1]?.emissoesEvitadas.toFixed(2),
            color: 'bg-red-500'
        },
        {
            title: 'Emissões de resíduos Evitadas',
            value: totalEmissionsAvoided[2]?.emissoesEvitadas.toFixed(2),
            color: 'bg-green-500'
        },
        {
            title: 'Emissões de gás Evitadas',
            value: totalEmissionsAvoided[3]?.emissoesEvitadas.toFixed(2),
            color: 'bg-gray-500'
        },
    ]

    const getAvoidedEmissions = async () => {
        const data = selectedProject

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/emissoesMensal/listarEmissoesEvitadasEspecificoPorProjeto?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('emissões evitadas:', data);
                setTotalEmissionsAvoided(data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <div className="flex flex-row flex-wrap w-full lg:w-[calc(100%/2-12px)] gap-2">
            {emissions.map((emission, i) => (
                <article key={i} className="relative flex flex-row lg:flex-col items-start justify-center w-[calc(100%/2-10px)] lg:w-[calc(100%/4-8px)] pb-2 gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 ${emission.color} w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>
                    <div className="relative flex flex-col items-start pt-6 px-4 justify-center gap-4">
                        <span className="text-sm font-normal text-black">{emission.title}</span>
                        <div className="flex flex-row gap-4">
                            <span className="text-lg font-medium text-black">{emission?.value} kg CO2 e</span>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}