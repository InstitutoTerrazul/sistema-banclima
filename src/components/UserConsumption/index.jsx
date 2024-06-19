'use client'
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function UserConsumption(props) {
    const userId = props.id;

    const { userData, setUserConsumptionPopUp } = useAuth();

    const [usersList, setUsersList] = useState([]);
    const [valuesAgua, setValuesAgua] = useState([]);
    const [valuesEnergia, setValuesEnergia] = useState([]);
    const [valuesGas, setValuesGas] = useState([]);
    const [valuesResiduos, setValuesResiduos] = useState([]);
    const [totalEmissions, setTotalEmissions] = useState(0);

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        const total = calculateTotalEmissions(valuesAgua) + calculateTotalEmissions(valuesEnergia) + calculateTotalEmissions(valuesGas) + calculateTotalEmissions(valuesResiduos);
        setTotalEmissions(total.toFixed(2));
    }, [valuesAgua, valuesEnergia, valuesGas, valuesResiduos]);


    useEffect(() => {
        setValuesAgua(usersList?.listaAgua)
        setValuesEnergia(usersList?.listaEnergiaEletrica)
        setValuesGas(usersList?.listaGas)
        setValuesResiduos(usersList?.listaResiduos)
    }, [usersList])

    const calculateTotalEmissions = (values) => {
        return values?.reduce((total, item) => total + parseFloat(item.emissao), 0) || 0;
    }

    const getUsers = async () => {
        try {
            if (userData.login === undefined) {
                return;
            }

            const response = await fetch(`http://191.252.38.35:8080/api/consumos/listarPorCpf?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userId)
            });
            if (response.ok) {
                const data = await response.json();
                setUsersList(data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <>
            <div className="fixed top-0 left-0 flex flex-col justify-center items-center p-10 lg:pl-72 2xl:pr-32 w-full h-screen gap-8 bg-black/20 rounded-xl z-40 ">

                <div className="relative w-full p-8 bg-white rounded-lg max-h-[900px] overflow-auto">
                    <span className="absolute top-4 right-4 cursor-pointer text-black text-xl" onClick={() => setUserConsumptionPopUp(false)}>X</span>
                    <h1 className="text-2xl font-bold text-gray-800 text-start my-4">Consumo</h1>

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
                                    <td className="border border-slate-600 px-4">{parseFloat(user.emissao).toFixed(2)} kg CO2e </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-lg font-bold text-gray-800 my-4">Total de Emissões: {calculateTotalEmissions(valuesAgua)} kg CO2e</div>

                    <hr className="my-6 border-t-2 border-gray-300" />

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
                                    <td className="border border-slate-600 px-4">{parseFloat(user.emissao).toFixed(2)} kg CO2e </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-lg font-bold text-gray-800 my-4">Total de Emissões: {calculateTotalEmissions(valuesEnergia).toFixed(2)} kg CO2e</div>

                    <hr className="my-6 border-t-2 border-gray-300" />

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
                                    <td className="border border-slate-600 px-4">{parseFloat(user.emissao).toFixed(2)} kg CO2e </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-lg font-bold text-gray-800 my-4">Total de Emissões: {calculateTotalEmissions(valuesGas)} kg CO2e</div>

                    <hr className="my-6 border-t-2 border-gray-300" />

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
                                    <td className="border border-slate-600 px-4">{parseFloat(user.emissao).toFixed(2)} kg CO2e </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-lg font-bold text-gray-800 my-4">Total de Emissões: {calculateTotalEmissions(valuesResiduos)} kg CO2e</div>
                    <div className="fixed bottom-0 left-0 w-full p-4 bg-white text-black text-lg font-bold text-center">
                        Somatória Total de Emissões: {totalEmissions} kg CO2e
                    </div>
                </div>
            </div>
        </>
    )
}
