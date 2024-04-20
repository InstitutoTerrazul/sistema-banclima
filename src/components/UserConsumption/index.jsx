'use client'
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DataTable from 'react-data-table-component';
import EditUser from "@/components/EditUser";
import { UserList } from "@phosphor-icons/react";

export default function UserConsumption(props) {
    const userId = props.id;

    console.log('User id:', userId);

    const { userData, projectList, setProjectList, editUserPopUp, setEditUserPopUp, userConsumptionPopUp, setUserConsumptionPopUp } = useAuth();

    const [usersList, setUsersList] = useState([]);
    const [user, setUser] = useState({});
    const [editUserId, setEditUserId] = useState('');
    const [values, setValues] = useState([]);
    const [valuesAgua, setValuesAgua] = useState([]);
    const [valuesEnergia, setValuesEnergia] = useState([]);
    const [valuesGas, setValuesGas] = useState([]);
    const [valuesResiduos, setValuesResiduos] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        // const array = [];

        // const dataAgua = usersList.listaAgua?.map(row => ({
        //     agua: row.consumo
        // }))

        // const dataEnergia = usersList.listaEnergiaEletrica?.map(row => ({
        //     energia: row.consumo
        // }))

        // const dataGas = usersList.listaGas?.map(row => ({
        //     gas: row.consumo
        // }))

        // const dataResiduos = usersList.listaResiduos?.map(row => ({
        //     residuos: row.consumo
        // }))

        // array.push(dataAgua, dataEnergia, dataGas, dataResiduos)

        // setValues(array)
        setValuesAgua(usersList?.listaAgua)
        setValuesEnergia(usersList?.listaEnergiaEletrica)
        setValuesGas(usersList?.listaGas)
        setValuesResiduos(usersList?.listaResiduos)

        console.log('data:', usersList.listaAgua)
    }, [usersList])

    // useEffect(() => {
    //     const dataAgua = values.map(row => ({
    //         agua: row?.map(row2 => row2.agua)
    //     }))
    //     const dataEnergia = values.map(row => ({
    //         energia: row?.map(row2 => row2.energia)
    //     }))
    //     const dataGas = values.map(row => ({
    //         gas: row?.map(row2 => row2.gas)
    //     }))
    //     const dataResiduos = values.map(row => ({
    //         residuos: row?.map(row2 => row2.residuos)
    //     }))

    //     const arrayFormated = [dataAgua, dataEnergia, dataGas, dataResiduos]

    //     console.log('data:', arrayFormated);
    //     const transformedValues = values;
    // }, [values])

    const getUsers = async () => {

        const data = userData

        try {
            const response = await fetch('http://191.252.38.35:8080/api/consumos/listarPorCpf?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userId)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('consumo do usuario:', data);
                setUsersList(data);
                // setSelectedProject(data[0]?.nome);

            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const columns = [
        {
            name: 'Agua',
            selector: row => row.agua,
        },
        {
            name: 'Energia',
            selector: row => row.energia,
        },
        {
            name: 'Gas',
            selector: row => row.gas,
        },
        {
            name: 'Residuos',
            selector: row => row.residuos,
        },
    ];




    const data = values?.map(row => ({
        // console.log('row:', row)
        // agua: row[0]?.agua,
        // energia: row[0]?.energia,
        // gas: row[0]?.gas,
        // residuos: row[0]?.residuos,
    }))

    return (
        <>
            <div className="fixed top-0 left-0 flex flex-col justify-center items-center p-10 lg:pl-72 w-full h-screen gap-8 bg-black/20 rounded-xl">

                <div className="relative w-full p-8 bg-white rounded-lg">
                    <span className="absolute top-4 right-4 cursor-pointer text-black text-xl" onClick={() => setUserConsumptionPopUp(false)}>X</span>
                    <h1 className="text-2xl font-bold text-gray-800 text-start my-4">Consumo</h1>
                    {/* <DataTable
                        columns={columns}
                        data={data}
                    /> */}

                    <span className="text-2xl font-bold text-gray-800 my-4">Água</span>

                    <table class="table-fixed text-black w-full border-collapse border border-slate-500 my-4">
                        <thead>
                            <tr>
                                <th className="border border-slate-600">Data</th>
                                <th className="border border-slate-600">Consumo</th>
                                <th className="border border-slate-600">Emissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valuesAgua?.map((user, i) => (

                                <tr key={i}>
                                    <td className="border border-slate-600 px-4">{user.data}</td>
                                    <td className="border border-slate-600 px-4">{user.consumo} m³</td>
                                    <td className="border border-slate-600 px-4">{user.emissao} kg CO2e </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span className="text-2xl font-bold text-gray-800 my-4">Energia</span>

                    <table class="table-fixed text-black w-full border-collapse border border-slate-500 my-4">
                        <thead>
                            <tr>
                                <th className="border border-slate-600">Data</th>
                                <th className="border border-slate-600">Consumo</th>
                                <th className="border border-slate-600">Emissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valuesEnergia?.map((user, i) => (

                                <tr key={i}>
                                    <td className="border border-slate-600 px-4">{user.data}</td>
                                    <td className="border border-slate-600 px-4">{user.consumo} Kwh</td>
                                    <td className="border border-slate-600 px-4">{user.emissao} kg CO2e </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span className="text-2xl font-bold text-gray-800 my-4">Gás</span>

                    <table class="table-fixed text-black w-full border-collapse border border-slate-500 my-4">
                        <thead>
                            <tr>
                                <th className="border border-slate-600">Data</th>
                                <th className="border border-slate-600">Consumo</th>
                                <th className="border border-slate-600">Emissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valuesGas?.map((user, i) => (

                                <tr key={i}>
                                    <td className="border border-slate-600 px-4">{user.data}</td>
                                    <td className="border border-slate-600 px-4">{user.consumo} m³</td>
                                    <td className="border border-slate-600 px-4">{user.emissao} kg CO2e </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span className="text-2xl font-bold text-gray-800 my-4">Resíduos</span>

                    <table class="table-fixed text-black w-full border-collapse border border-slate-500 my-4">
                        <thead>
                            <tr>
                                <th className="border border-slate-600">Data</th>
                                <th className="border border-slate-600">Consumo</th>
                                <th className="border border-slate-600">Emissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valuesResiduos?.map((user, i) => (

                                <tr key={i}>
                                    <td className="border border-slate-600 px-4">{user.data}</td>
                                    <td className="border border-slate-600 px-4">{user.consumo} kg</td>
                                    <td className="border border-slate-600 px-4">{user.emissao} kg CO2e </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}



[
    {
        "listaAgua": [
            {
                "id": "8fbbc79d-20f1-4549-894c-30379a5640d4",
                "tipoEmissao": "agua",
                "nome": "teste alisson",
                "cpf": "877.625.524-54",
                "endereco": "rua teste, 50",
                "data": "16/04/2024",
                "consumo": "5",
                "emissao": "3.25",
                "taxaDeReducao": "0"
            }
        ],
        "listaEnergiaEletrica": [
            {
                "id": "771698e9-5720-4865-9348-d0a55b9dd821",
                "tipoEmissao": "energiaeletrica",
                "nome": "teste alisson",
                "cpf": "877.625.524-54",
                "endereco": "rua teste, 50",
                "data": "16/04/2024",
                "consumo": "700",
                "emissao": "15.120001",
                "taxaDeReducao": "0"
            }
        ],
        "listaResiduos": [
            {
                "id": "25f0d7e3-9f74-40e8-9171-9db91d38fc83",
                "tipoEmissao": "residuos",
                "nome": "teste alisson",
                "cpf": "877.625.524-54",
                "endereco": "rua teste, 50",
                "data": "16/04/2024",
                "consumo": "180",
                "emissao": "509.4",
                "taxaDeReducao": "0"
            }
        ],
        "listaGas": [
            {
                "id": "83c769c5-7758-46f4-a791-7aa4fb45cf15",
                "tipoEmissao": "gas",
                "nome": "teste alisson",
                "cpf": "877.625.524-54",
                "endereco": "rua teste, 50",
                "data": "16/04/2024",
                "consumo": "1",
                "emissao": "25.09",
                "taxaDeReducao": "0"
            }
        ]
    }
]