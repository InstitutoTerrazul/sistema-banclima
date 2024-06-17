'use client'
import { useEffect, useState } from "react";
import Select from 'react-select'
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ReactInputMask from "react-input-mask";
import DataTable from 'react-data-table-component';
import UserConsumption from "@/components/UserConsumption";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function Consulta() {
    const router = useRouter();

    const { userData, userConsumptionPopUp, setUserConsumptionPopUp, setIsLoading } = useAuth();

    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    const [searchCpf, setSearchCpf] = useState('');
    const [searchBtnText, setSearchBtnText] = useState('Buscar');
    const [tableData, setTableData] = useState([]);
    const [userSelectedId, setUserSelectedId] = useState();

    const columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
        },
        {
            name: 'Projeto',
            selector: row => row.projeto,
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
            name: 'CPF',
            selector: row => row.cpf,
        },
        {
            name: 'E-mail',
            selector: row => row.email,
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
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: 12
            },
        },
    };

    const data = tableData.map(row => ({
        nome: row.cliente.nome,
        email: row.cliente.email,
        telefone: row.cliente.telefone,
        endereco: row.cliente.endereco,
        projeto: row.cliente.projeto,
        cpf: row.cliente.cpf,
        matriculaDeEnergia: row.cliente.matriculaDeEnergia,
        matriculaDeAgua: row.cliente.matriculaDeAgua,
        matriculaDeGas: row.cliente.matriculaDeGas,
        beneficioTotal: row.beneficioTotal,
        emissaoTotal: row.emissaoTotal,
        emissoesEvitadas: row.emissoesEvitadas,
        taxaDeReducaoTotal: row.taxaDeReducaoTotal,
        projeto: row.cliente.projeto
    }))


    const handleUserConsumption = (user) => {
        setUserSelectedId(user);
        setUserConsumptionPopUp(true);
    }

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
            if(userData.login === undefined) {
                return;
            }
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
                toast.error('ops! algo deu errado');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('ops! algo deu errado');
        }
    }

    const getClientList = async () => {
        try {
            const response = await fetch(`http://191.252.38.35:8080/api/clientes/listarPorProjeto?login=${userData.login}&senha=${userData.senha}&projeto=${selectedProject}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTableData(data);
                toast.success('Busca concluída!');
            } else {
                console.error('Failed to create post');
                toast.error('ops! algo deu errado');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('ops! algo deu errado');
        }
    }

    const handleSearchBtn = async () => {
        setSearchBtnText('Buscando...');

        const dataSearch = searchCpf


        try {
            const response = await fetch(`http://191.252.38.35:8080/api/clientes/listarPorCpf?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSearch)
            });
            if (response.ok) {
                const data = await response.json();
                setTableData(data);
                toast.success('CPF encontrado!');
                setSearchBtnText('Buscar');
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

    const ExpandedComponent = ({ data }) => {
        return (
            <div className="flex flex-col w-full gap-4 p-4 border-b border-[#e0e0e0]">
                {/* <span>Projeto: {data.projeto}</span> */}
                <div className="flex flex-col text-sm gap-1">
                    <span><b>nome:</b> {data.nome}</span>
                    <span><b>email:</b> {data.email}</span>
                    <span><b>telefone:</b> {data.telefone}</span>
                    <span><b>cpf:</b> {data.cpf}</span>
                </div>
                <div className="flex flex-row w-full items-center justify-around gap-4">
                    <div className="flex flex-col gap-2">
                        <span><b>Benefício Total:</b></span>
                        <span>{parseFloat(data.beneficioTotal).toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span><b>Emissão Total:</b></span>
                        <span>{parseFloat(data.emissaoTotal).toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span><b>Emissões Evitadas:</b></span>
                        <span>{parseFloat(data.emissoesEvitadas).toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span><b>Taxa de Redução Total:</b></span>
                        <span>{parseFloat(data.taxaDeReducaoTotal).toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        title="Editar"
                        type="button"
                        rel="noreferrer"
                        className="flex justify-center items-center gap-2 text-white px-2 h-10 bg-primary rounded-lg"
                        onClick={() => handleUserConsumption(data.cpf)}
                    >
                        Ver Consumo
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <ToastContainer theme="colored" />
            <h1 className="text-2xl font-bold text-gray-800 text-start">Consulta</h1>

            <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-8 my-4">
                <Select
                    placeholder="Buscar por projeto"
                    options={options}
                    onChange={(selectedOption) => setSelectedProject(selectedOption?.value)}
                    className="w-full lg:w-1/2 h-11 text-black"
                />
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={() => getClientList()} >Buscar</button>
                <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='Digite o cpf do cliente' type="text" className="bg-white w-full lg:w-4/12 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={searchCpf} onChange={(e) => setSearchCpf(e.target.value)} />
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={() => handleSearchBtn()} >{searchBtnText}</button>
            </div>

            <div className="w-full p-2 bg-white rounded-lg">
                <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>
            {userConsumptionPopUp && <UserConsumption id={userSelectedId} />}
        </>
    )
}