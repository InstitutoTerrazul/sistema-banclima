'use client'
import { useState } from "react";
import DataTable from "react-data-table-component";

export default function EditarCalculo() {
    const [tableData, setTableData] = useState([]);

    const columns = [
        {
            name: 'Tipo de Emissão',
            selector: row => row.TipoEmissao,
        },
        {
            name: 'Valor',
            selector: row => row.valor,
        },
        {
            name: 'Mês/Ano',
            selector: row => row.mesAno,
        },
    ];

    // const data = tableData.map(row => ({
    //     nome: row.nome,
    //     email: row.email,
    //     telefone: row.telefone,
    //     endereco: row.endereco,
    //     projeto: row.projeto
    // }))

    const data = [
        {
            TipoEmissao: 'Agua',
            valor: '0.75',
            mesAno: '02/2024',
        },
        {
            TipoEmissao: 'Energia',
            valor: '0.75',
            mesAno: '02/2024',
        },
        {
            TipoEmissao: 'Gás',
            valor: '0.75',
            mesAno: '02/2024',
        },
        {
            TipoEmissao: 'Residuos',
            valor: '0.75',
            mesAno: '02/2024',
        },
    ]

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 text-start">Editar Calculos de Emissão</h1>

            <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-xl p-10">

                <div className="flex flex-row justify-center items-center w-full gap-8 my-4">
                    <input type="text" placeholder="Agua" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Gás" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                </div>
                <div className="flex flex-row justify-center items-center w-full gap-8">
                    <input type="text" placeholder="Energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <div className="flex flex-row justify-center items-center w-full gap-8">
                        <input type="text" placeholder="Pesquisar" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="Pesquisar" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="Pesquisar" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    </div>
                </div>
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