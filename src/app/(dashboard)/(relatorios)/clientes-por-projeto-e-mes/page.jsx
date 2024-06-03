'use client'
import { useEffect, useState } from "react";
import Select from 'react-select'
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ReactInputMask from "react-input-mask";
import DataTable from 'react-data-table-component';
import { Printer } from "@phosphor-icons/react";


export default function ClientesPorProjetoEMes() {
    const router = useRouter();

    const { userData, setProjectList, projectList, setIsLoading } = useAuth();

    const [selectedProject, setSelectedProject] = useState();
    const [searchCpf, setSearchCpf] = useState('');
    const [searchBtnText, setSearchBtnText] = useState('Buscar');
    const [tableData, setTableData] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
        },
        {
            name: 'E-mail',
            selector: row => row.email,
        },
        {
            name: 'Telefone',
            selector: row => row.telefone,
        },
        {
            name: 'Endereço',
            selector: row => row.endereco,
        },
        {
            name: 'cpf',
            selector: row => row.cpf,
        },
        {
            name: 'Matricula Energia',
            selector: row => row.matriculaDeEnergia,
        },
        {
            name: 'Matricula água',
            selector: row => row.matriculaDeAgua,
        },
        {
            name: 'Matricula gás',
            selector: row => row.matriculaDeGas,
        },
    ];

    const data = tableData.map(row => ({
        nome: row.nome,
        email: row.email,
        telefone: row.telefone,
        endereco: row.endereco,
        projeto: row.projeto,
        cpf: row.cpf,
        matriculaDeEnergia: row.matriculaDeEnergia,
        matriculaDeAgua: row.matriculaDeAgua,
        matriculaDeGas: row.matriculaDeGas
    }))

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }

        setIsLoading(false)
    }, []);

    const handleChangeMounth = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSearchBtn = async () => {
        setSearchBtnText('Buscando...');

        const dataSearch = searchCpf


        try {
            const response = await fetch(`http://191.252.38.35:8080/api/clientes/listarPorProjetoEMesEAno?login=${userData.login}&senha=${userData.senha}&mes=${selectedMonth}&ano=${selectedYear}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProject)
            });
            if (response.ok) {
                const data = await response.json();
                setTableData(data);
                setSearchBtnText('Encontrado!');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            setSearchBtnText('Buscar');
            setSearchCpf('');
        }, 2000);
    }

    const options = projectList?.map((project) => ({
        value: project.nome,
        label: project.nome
    }))

    const handlePrint = () => {
        window.print();
    };

    return (
        <>

            <div className="flex flex-row items-center justify-between w-full mt-10">
                <h1 className="text-2xl font-bold text-gray-800 text-start">Clientes cadastrados por projeto e mês</h1>
                <button onClick={handlePrint} className="flex items-center justify-center bg-white rounded-lg px-4 py-2"><Printer size={24} color="#93C5FD" /></button>
            </div>

            <div className="flex flex-row justify-center items-center w-full gap-8 my-4">
                <Select placeholder="Buscar por projeto" options={options} onChange={(selectedOption) => setSelectedProject(selectedOption?.value)} className=" w-1/2 h-11 text-black z-40" />
                <select value={selectedMonth} onChange={handleChangeMounth} className="bg-white  h-11 rounded-lg focus:outline-none border border-gray-700/45  text-black">
                    <option value="">Mês</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>

                <select value={selectedYear} onChange={handleChange} className="bg-white  h-11 rounded-lg focus:outline-none border border-gray-700/45  text-black">
                    <option value="">Ano</option>
                    {Array.from({ length: 20 }, (_, i) => 2021 + i).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={() => handleSearchBtn()} >{searchBtnText}</button>
            </div>

            <div className="w-full p-2 bg-white rounded-lg">
                <DataTable
                    columns={columns}
                    data={data}
                    noDataComponent="Nenhuma informação encontrada"
                />
            </div>
        </>
    )
}