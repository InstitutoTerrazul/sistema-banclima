'use client'
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DataTable from 'react-data-table-component';
import { Printer } from "@phosphor-icons/react";



export default function ListarProjetos() {

    const { userData, projectList, setProjectList } = useAuth();

    const columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
        },
        {
            name: 'Bairro',
            selector: row => row.bairro,
        },
        {
            name: 'Rua',
            selector: row => row.rua,
        },
        {
            name: 'Número',
            selector: row => row.numero,
        },
    ];

    const data = projectList.map(row => ({
        nome: row.nome,
        bairro: row.bairro,
        rua: row.rua,
        numero: row.numero,
    }))

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className="flex flex-row items-center justify-between w-full mt-10">
                <h1 className="text-2xl font-bold text-gray-800 text-start">Lista de projetos</h1>
                <button onClick={handlePrint} className="flex items-center justify-center bg-white rounded-lg px-4 py-2"><Printer size={24} color="#93C5FD"/></button>
            </div>

            <div className="w-full p-2 bg-white rounded-lg">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
}