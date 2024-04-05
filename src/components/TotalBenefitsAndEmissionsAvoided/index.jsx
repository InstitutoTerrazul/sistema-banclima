import { useEffect, useState } from "react"

export default function TotalBenefitsAndEmissionsAvoided() {
    const [benefits, setBenefits] = useState(0)
    const [emissionsAvoided, setEmissionsAvoided] = useState(0)

    useEffect(() => {
        getCardsData()
    }, [])

    const getCardsData = async () => {

        const data = "projeto 1"

        try {
            const response = await fetch('http://191.252.38.35:8080/api/emissoesMensal/totalBeneficioPorProjeto?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('total de beneficios:', data);
                setBenefits(data)
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        try {
            const response = await fetch('http://191.252.38.35:8080/api/emissoesMensal/totalEmissoesEvitadasPorProjeto?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('emissoes evitadas:', data);
                setEmissionsAvoided(data)
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }
    return (
        <section className="relative flex flex-row xl:flex-row justify-start items-start w-full gap-8">
            <article className="flex flex-col items-center justify-center pb-4 gap-4 w-[calc(100%/2)] bg-white rounded-xl">
                <div className="bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                <div className="flex flex-col items-center py-2 px-10 justify-center gap-4">
                    <span className="text-2xl font-normal text-black">Total de Benefícios (R$)</span>
                    <span className="text-3xl font-medium text-black">R$ {benefits}</span>
                </div>
            </article>
            <article className="flex flex-col items-center justify-center pb-4 gap-4 w-[calc(100%/2-20px)] bg-white rounded-xl">
                <div className="bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                <div className="flex flex-col items-center py-2 px-10 justify-center gap-4">
                    <span className="text-2xl font-normal text-black">Total de emissões evitadas</span>
                    <span className="text-3xl font-medium text-black">{emissionsAvoided} kg CO2 e</span>
                </div>
            </article>
        </section>
    )
}