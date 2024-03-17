'use client'
import AvoidedEmissionsGraph from "@/components/AvoidedEmissionsGraph";
import HistoryGraph from "@/components/HistoryGraph";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function Home() {
    const router = useRouter();


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }
    }, []);

    const emissions = [
        {
            title: 'Emissões de energia Evitadas',
            value: '10',
            color: 'bg-red-500'
        },
        {
            title: 'Emissões de água Evitadas',
            value: '10',
            color: 'bg-blue-400'
        },
        {
            title: 'Emissões de resíduos Evitadas',
            value: '10',
            color: 'bg-green-500'
        },
        {
            title: 'Emissões de gás Evitadas',
            value: '10',
            color: 'bg-gray-500'
        },
    ]

    return (
        <>
            <section className="relative flex flex-row justify-start items-start w-full gap-8">
                <article className="relative flex flex-row justify-center p-4 bg-white rounded-xl items-start w-[calc(100%/2-10px)] gap-8">
                    <HistoryGraph />
                </article>
                <article className="relative flex flex-row justify-center p-4 bg-white rounded-xl items-start w-[calc(100%/2-10px)] gap-8">
                    <AvoidedEmissionsGraph />
                </article>
            </section>

            <section className="relative flex flex-row xl:flex-row justify-start items-start w-full gap-8">
                <div className="flex flex-row w-[calc(100%/2)] gap-4">
                    <article className="flex flex-col items-start justify-center w-[calc(100%/2)] pb-2 gap-4 bg-white rounded-xl">
                        <div className="bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col items-start py-2 px-8 justify-center gap-4">
                            <span className="text-base font-normal text-black">Total de clientes cadastrados</span>
                            <span className="text-2xl font-medium text-black">10 Clientes</span>
                        </div>
                    </article>
                    <article className="flex flex-col items-start justify-center w-[calc(100%/2)] pb-2 gap-4 bg-white rounded-xl">
                        <div className="bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                        <div className="flex flex-col items-start py-2 px-8 justify-center gap-4">
                            <span className="text-base font-normal text-black">Total de clientes beneficiados</span>
                            <span className="text-2xl font-medium text-black">10 Clientes</span>
                        </div>
                    </article>
                </div>
                <div className="flex flex-row w-[calc(100%/2-20px)] gap-4">
                    {emissions.map((emission, i) => (
                        <article key={i} className="relative flex flex-col items-start justify-center w-[calc(100%/4-10px)] pb-2 gap-4 bg-white rounded-xl">
                            <div className={`absolute top-0 ${emission.color} w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>
                            <div className="relative flex flex-col items-start pt-6 px-4 justify-center gap-4">
                                <span className="text-sm font-normal text-black">{emission.title}</span>
                                <div className="flex flex-row gap-4">
                                    <span className="text-lg font-medium text-black">{emission.value} kg CO2 e</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <section className="relative flex flex-row xl:flex-row justify-start items-start w-full gap-8">
                <article className="flex flex-col items-center justify-center pb-4 gap-4 w-[calc(100%/2)] bg-white rounded-xl">
                    <div className="bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                    <div className="flex flex-col items-center py-2 px-10 justify-center gap-4">
                        <span className="text-2xl font-normal text-black">Total de Benefícios</span>
                        <span className="text-3xl font-medium text-black">10 Clientes</span>
                    </div>
                </article>
                <article className="flex flex-col items-center justify-center pb-4 gap-4 w-[calc(100%/2-20px)] bg-white rounded-xl">
                    <div className="bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                    <div className="flex flex-col items-center py-2 px-10 justify-center gap-4">
                        <span className="text-2xl font-normal text-black">Total de emissões evitadas</span>
                        <span className="text-3xl font-medium text-black">10 kg CO2 e</span>
                    </div>
                </article>
            </section>
        </>
    )
}