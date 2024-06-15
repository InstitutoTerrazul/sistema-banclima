'use client'
import { useEffect, useState } from "react";
import Select from 'react-select'
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ReactInputMask from "react-input-mask";
import DataTable from 'react-data-table-component';
import { Printer } from "@phosphor-icons/react";


export default function EmissoesEvitadas() {
    const router = useRouter();

    const { setIsLoading } = useAuth();

    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    const [searchCpf, setSearchCpf] = useState('');
    const [searchBtnText, setSearchBtnText] = useState('Buscar');
    const [tableData, setTableData] = useState([]);

    const [userData, setUserData] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    });


    const columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
        },
        {
            name: 'CPF',
            selector: row => row.cpf,
        },
        {
            name: 'Endereço',
            selector: row => row.endereco,
        },
        {
            name: 'Projeto',
            selector: row => row.projeto,
        },
        {
            name: 'Mês',
            selector: row => row.mes,
        },
        {
            name: 'Ano',
            selector: row => row.ano,
        },
        {
            name: 'Emissão',
            selector: row => row.emissao,
        },
        {
            name: 'Taxa de Redução',
            selector: row => row.taxaDeReducao,
        },
        {
            name: 'Beneficio',
            selector: row => row.beneficio,
        },
    ];

    const data = tableData.map(row => ({
        nome: row.cliente.nome,
        cpf: row.cliente.cpf,
        endereco: row.cliente.endereco,
        projeto: row.cliente.projeto,
        mes: row.emissaoMensal.mes,
        ano: row.emissaoMensal.ano,
        emissao: parseFloat(row.emissaoMensal.emissao).toFixed(2),
        taxaDeReducao: parseFloat(row.emissaoMensal.taxaDeReducao).toFixed(2),
        beneficio: row.emissaoMensal.beneficio
    }))

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }

        setIsLoading(false)

        getProjects();
    }, []);

    const getProjects = async () => {
        try {
            const response = await fetch(`http://191.252.38.35:8080/api/projetos/listar?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();
                setProjectList(data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const getClientList = async () => {
        try {
            const response = await fetch(`http://191.252.38.35:8080/api/emissoesMensal/listarPorProjeto?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProject)
            });
            if (response.ok) {
                const data = await response.json();
                setTableData(data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const handleSearchBtn = async () => {
        setSearchBtnText('Buscando...');

        const dataSearch = searchCpf


        try {
            const response = await fetch(`http://191.252.38.35:8080/api/emissoesMensal/listarPorCpf?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSearch)
            });
            if (response.ok) {
                const data = await response.json();
                setTableData(data);
                setSearchBtnText('CPF encontrado!');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            setSearchBtnText('Buscar');
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
                <h1 className="text-2xl font-bold text-gray-800 text-start">Total de emissões evitadas</h1>
                <button onClick={handlePrint} className="flex items-center justify-center bg-white rounded-lg px-4 py-2"><Printer size={24} color="#93C5FD" /></button>
            </div>

            <div className="flex flex-row justify-center items-center w-full gap-8 my-4">
                <Select
                    placeholder={options.length > 0 ? "Selecione um projeto" : "Nenhum projeto encontrado"}
                    options={options}
                    onChange={(selectedOption) => setSelectedProject(selectedOption?.value)}
                    className="w-1/2 h-11 text-black z-40"
                    noOptionsMessage={() => "Nenhum projeto encontrado"}
                />
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={() => getClientList()} >Buscar</button>
                <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='Digite o cpf do cliente' type="text" className="bg-white w-4/12 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={searchCpf} onChange={(e) => setSearchCpf(e.target.value)} />
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