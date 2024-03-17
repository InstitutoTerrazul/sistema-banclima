'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InserirConsumo() {
    const router = useRouter();


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }
    }, []);
    
    return (
        <form className="flex flex-col items-start justify-center w-full gap-8">
            <h1 className="text-2xl font-bold text-gray-800 text-start">Inserir Consumo</h1>
            <div className="flex flex-row justify-center items-center w-full gap-8">
                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados cadastrais</h1>

                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Nome completo" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="Cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    </div>
                    <input type="text" placeholder="Endereço" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Email" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="Telefone" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    </div>
                    <input type="text" placeholder="Nº de Habitantes na residência" name="" id="" className="bg-white w-1/2 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />

                </div>

                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-green-600 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados contas de consumo</h1>

                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Código do cliente / energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="Titular de energia do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Código do cliente / água" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="Titular de água do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    </div>
                    <input type="text" placeholder="Código do cliente / gas" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Titular de gás do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />

                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full gap-8">
                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados de consumo - Marco zero</h1>

                    <input type="text" placeholder="Consumo de energia em kWh" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Consumo de água em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Geração de resíduos em kg" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Consumo de gás em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Consumo de gás nº de botijões" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />

                </div>

                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados contas de consumo</h1>

                    <input type="text" placeholder="Kg CO2e Energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Kg CO2e Água" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Kg CO2e Resíduos" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Kg CO2e Gás em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Kg CO2e Gás nº de botijões" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />

                </div>
            </div>
            <div className="flex flex-row justify-end items-center w-full gap-8">
                <button type="submit" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg">Cadastrar</button>
            </div>
        </form>
    );
}