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

    const { userData, projectList, setProjectList, selectedProject, setSelectedProject } = useAuth();

    // const [projectList, setProjectList] = useState([]);
    // const [selectedProject, setSelectedProject] = useState();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }

        // getProjects();
    }, []);

    // useEffect(() => {
    //     console.log(projectList[0]);
    // }, [projectList]);

    // const getProjects = async () => {
    //     try {
    //         const response = await fetch('http://191.252.38.35:8080/api/projetos/listar?login=terrazul&senha=1234567', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(userData)
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('get projetos:', data);
    //             setProjectList(data);
    //         } else {
    //             console.error('Failed to create post');
    //         }
    //     } catch (error) {
    //         console.error('Error creating post:', error);
    //     }
    // }

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
                <Select options={options} defaultValue={options[0]} onChange={(selectedOption) => setSelectedProject(selectedOption?.value)} className=" w-1/2 h-11 text-black z-40" />
                {/* <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" >Buscar</button> */}
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
                <AvoidedEmission />
            </section>
            <TotalBenefitsAndEmissionsAvoided />
        </>
    )
}