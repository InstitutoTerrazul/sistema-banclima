'use client'
import { useEffect, useState } from "react";
import Select from 'react-select'
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ReactInputMask from "react-input-mask";
import DataTable from 'react-data-table-component';
import { Printer } from "@phosphor-icons/react";


export default function ClientesCadastrados() {
    const router = useRouter();

    const { userData, setIsLoading } = useAuth();

    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    const [searchCpf, setSearchCpf] = useState('');
    const [searchBtnText, setSearchBtnText] = useState('Buscar');
    const [tableData, setTableData] = useState([]);

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
        nome: row.cliente.nome,
        email: row.cliente.email,
        telefone: row.cliente.telefone,
        endereco: row.cliente.endereco,
        projeto: row.cliente.projeto,
        cpf: row.cliente.cpf,
        matriculaDeEnergia: row.cliente.matriculaDeEnergia,
        matriculaDeAgua: row.cliente.matriculaDeAgua,
        matriculaDeGas: row.cliente.matriculaDeGas
    }))


    useEffect(() => {
        // setProjectList(projectList[0]?.nome);
        console.log(selectedProject);
    }, [selectedProject]);

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
            const response = await fetch('http://191.252.38.35:8080/api/projetos/listar?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('get projetos:', data);
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
            const response = await fetch('http://191.252.38.35:8080/api/clientes/listarPorProjeto?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProject)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('lista de clientes:', data);
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
            const response = await fetch('http://191.252.38.35:8080/api/clientes/listarPorCpf?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSearch)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Data searched:', data);
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
                <h1 className="text-2xl font-bold text-gray-800 text-start">Clientes cadastrados por projeto ou CPF</h1>
                <button onClick={handlePrint} className="flex items-center justify-center bg-white rounded-lg px-4 py-2"><Printer size={24} color="#93C5FD" /></button>
            </div>

            <div className="flex flex-row justify-center items-center w-full gap-8 my-4">
                {/* <select id="mySelect" className="bg-white w-1/2 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 px-2 text-black">
                    <option value="Projeto 1" selected>Projeto 1</option>
                    <option value="Projeto 2">Projeto 2</option>
                </select> */}
                <Select placeholder="Buscar por projeto" options={options} onChange={(selectedOption) => setSelectedProject(selectedOption?.value)} className=" w-1/2 h-11 text-black z-40" />
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={() => getClientList()} >Buscar</button>
                <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='Digite o cpf do cliente' type="text" className="bg-white w-4/12 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={searchCpf} onChange={(e) => setSearchCpf(e.target.value)} />
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={() => handleSearchBtn()} >{searchBtnText}</button>
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