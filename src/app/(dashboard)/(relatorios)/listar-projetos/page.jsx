'use client'
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DataTable from 'react-data-table-component';



export default function ListarProjetos() {

    const { userData, projectList, setProjectList } = useAuth();

    useEffect(() => {
        console.log('projetos', projectList);
    }, [])

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

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 text-start">Lista de projetos</h1>

            <div className="w-full p-2 bg-white rounded-lg">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
}