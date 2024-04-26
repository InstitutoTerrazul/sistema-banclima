'use client'
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";


export default function EditarCalculo() {
    const [tableData, setTableData] = useState([]);

    const { userData } = useAuth();

    useEffect(() => {
        searchValues()
    }, [])

    const searchValues = async () => {
        // setSearchBtnText('Buscando...');
        console.log('User data:', userData);

        const dataSearch = userData


        try {
            const response = await fetch('http://191.252.38.35:8080/api/calculoEmissao/listar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Data searched:', data);
                setTableData(data);
                // setTableData(data);
                // setSearchBtnText('CPF encontrado!');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            // setSearchBtnText('Buscar');
            // setSearchCpf('');
        }, 2000);
    }

    const columns = [
        {
            name: 'Tipo de Emissão',
            selector: row => row.tipoEmissao,
        },
        {
            name: 'Valor',
            selector: row => row.valor,
        },
        {
            name: 'Mês/Ano',
            selector: row => row.data,
        },
    ];

    const data = tableData.map(row => ({
        valor: row.valor,
        data: row.data,
        tipoEmissao: row.tipoEmissao,
    }))

    // const data = [
    //     {
    //         TipoEmissao: 'Agua',
    //         valor: '0.75',
    //         mesAno: '02/2024',
    //     },
    //     {
    //         TipoEmissao: 'Energia',
    //         valor: '0.75',
    //         mesAno: '02/2024',
    //     },
    //     {
    //         TipoEmissao: 'Gás',
    //         valor: '0.75',
    //         mesAno: '02/2024',
    //     },
    //     {
    //         TipoEmissao: 'Residuos',
    //         valor: '0.75',
    //         mesAno: '02/2024',
    //     },
    // ]

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 text-start">Editar Fatores de Emissão</h1>

            <div className="flex flex-col items-end justify-center gap-4 bg-white rounded-xl p-10">

                {/* <div className="flex flex-row justify-center items-center w-full gap-8 my-4">
                    <input type="text" placeholder="Agua" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Gás" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                </div> */}
                <div className="flex flex-row justify-center items-center w-full gap-8">
                    <input type="text" placeholder="Energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <div className="flex flex-row justify-center items-center w-full gap-8">
                        <input type="text" placeholder="% Papel" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="% Plastico" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="% Orgânico" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    </div>
                </div>
                <button className="flex items-center justify-center bg-primary px-8 py-2 rounded-lg">Inserir</button>
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