'use client'
import AvoidedEmissionsGraph from "@/components/AvoidedEmissionsGraph";
import HistoryGraph from "@/components/HistoryGraph";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import RegisteredAndBenefitedCustomers from "@/components/RegisteredAndBenefitedCustomers";
import TotalBenefitsAndEmissionsAvoided from "@/components/TotalBenefitsAndEmissionsAvoided";
import Select from 'react-select'
import AvoidedEmission from "@/components/AvoidedEmission";


export default function Home() {
    const router = useRouter();

    const { userData } = useAuth();

    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }

        getProjects();
    }, []);

    useEffect(() => {
        // setProjectList(projectList[0]?.nome);
        console.log(projectList[0]);
    }, [projectList]);

    const getProjects = async () => {
        try {
            const response = await fetch('http://191.252.38.35:8080/api/projetos/listar?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('get projetos:', data);
                setProjectList(data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const options = projectList?.map((project) => ({
        value: project.nome,
        label: project.nome
    }))


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
            <div className="flex flex-row justify-center items-center w-full gap-8 my-8">
                {/* <select id="mySelect" className="bg-white w-1/2 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 px-2 text-black">
                    <option value="Projeto 1" selected>Projeto 1</option>
                    <option value="Projeto 2">Projeto 2</option>
                </select> */}
                <Select options={options} onChange={(selectedOption) => setSelectedProject(selectedOption?.value)} className=" w-1/2 h-11 text-black z-40" />
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" >Buscar</button>
            </div>

            <section className="relative flex flex-row justify-start items-start w-full gap-8">
                <article className="relative flex flex-row justify-center p-4 bg-white rounded-xl items-start w-[calc(100%/2-10px)] gap-8">
                    <HistoryGraph />
                </article>
                <article className="relative flex flex-row justify-center p-4 bg-white rounded-xl items-start w-[calc(100%/2-10px)] gap-8">
                    <AvoidedEmissionsGraph />
                </article>
            </section>

            <section className="relative flex flex-row xl:flex-row justify-start items-start w-full gap-8">
                <RegisteredAndBenefitedCustomers />
                {/* <div className="flex flex-row w-[calc(100%/2-20px)] gap-4">
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
                </div> */}
                <AvoidedEmission />
            </section>
            <TotalBenefitsAndEmissionsAvoided />
        </>
    )
}