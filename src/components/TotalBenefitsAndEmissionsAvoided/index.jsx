import { useEffect, useState } from "react"
import { AuthProvider, useAuth } from "@/contexts/AuthContext";


export default function TotalBenefitsAndEmissionsAvoided() {
    const [benefits, setBenefits] = useState(0)
    const [emissionsAvoided, setEmissionsAvoided] = useState(0)

    const { userData, selectedProject } = useAuth();


    useEffect(() => {
        getCardsData()
    }, [])

    useEffect(() => {
        getCardsData();
    }, [selectedProject])

    const getCardsData = async () => {
        if (!selectedProject) {
            return;
        }

        if (userData.login === undefined) {
            return;
        }

        const data = selectedProject

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/emissoesMensal/totalBeneficioPorProjeto?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                setBenefits(data)
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/emissoesMensal/listarEmissoesEvitadasEspecificoPorProjeto?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProject)
            });

            if (response.ok) {
                const data = await response.json();

                const soma = data.reduce((acc, item) => acc + item.emissoesEvitadas, 0);

                setEmissionsAvoided(soma);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
    return (
        <section className="relative flex flex-row flex-wrap xl:flex-row justify-start items-start w-full gap-6">
            <article className="flex flex-col items-center justify-center pb-4 gap-4 w-full lg:w-[calc(100%/2-12px)] bg-white rounded-xl">
                <div className="bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                <div className="flex flex-col items-center py-2 px-10 justify-center gap-4">
                    <span className="text-2xl font-normal text-black">Total de Benefícios (R$)</span>
                    <span className="text-3xl font-medium text-black">R$ {benefits}</span>
                </div>
            </article>
            <article className="flex flex-col items-center justify-center pb-4 gap-4 w-full lg:w-[calc(100%/2-12px)] bg-white rounded-xl">
                <div className="bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                <div className="flex flex-col items-center py-2 px-10 justify-center gap-4">
                    <span className="text-2xl font-normal text-black">Total de emissões evitadas</span>
                    <span className="text-3xl font-medium text-black">{emissionsAvoided.toFixed(2)} kg CO2 e</span>
                </div>
            </article>
        </section>
    )
}