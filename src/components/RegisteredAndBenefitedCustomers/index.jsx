'use client'
import { useEffect, useState } from "react"
import { AuthProvider, useAuth } from "@/contexts/AuthContext";


export default function RegisteredAndBenefitedCustomers() {

    const [registeredClient, setRegisteredClient] = useState(0)
    const [benefitedClient, setBenefitedClient] = useState(0)

    const { selectedProject, setSelectedProject } = useAuth();


    useEffect(() => {
        getCardsData()
    }, [])

    useEffect(() => {
        getCardsData();
    }, [selectedProject])

    const getCardsData = async () => {

        const data = selectedProject

        try {
            const response = await fetch('http://191.252.38.35:8080/api/clientes/totalClientesBeneficiadosPorProjeto?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('beneficiados:', data);
                setBenefitedClient(data)
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        try {
            const response = await fetch('http://191.252.38.35:8080/api/clientes/totalClientesCadastradosPorProjeto?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('clientes cadastrados:', data);
                setRegisteredClient(data)
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <div className="flex flex-row w-full lg:w-[calc(100%/2-12px)] gap-2">
            <article className="flex flex-col items-start justify-center w-full lg:w-[calc(100%/2-10px)] pb-2 gap-4 bg-white rounded-xl">
                <div className="bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                <div className="flex flex-col items-start py-2 px-8 justify-center gap-4">
                    <span className="text-base font-normal text-black">Total de clientes cadastrados</span>
                    <span className="text-2xl font-medium text-black">{registeredClient} Clientes</span>
                </div>
            </article>
            <article className="flex flex-col items-start justify-center w-full lg:w-[calc(100%/2-10px)] pb-2 gap-4 bg-white rounded-xl">
                <div className="bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl"></div>
                <div className="flex flex-col items-start py-2 px-8 justify-center gap-4">
                    <span className="text-base font-normal text-black">Total de clientes beneficiados</span>
                    <span className="text-2xl font-medium text-black">{benefitedClient} Clientes</span>
                </div>
            </article>
        </div>
    )
}