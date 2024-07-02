'use client'
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DataTable from 'react-data-table-component';
import { Printer } from "@phosphor-icons/react";

export default function ListarProjetos() {
    const { userData, projectList, setProjectList, setIsLoading } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPlanos, setSelectedPlanos] = useState([]);

    const openModal = (planos) => {
        setSelectedPlanos(planos);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedPlanos([]);
    };

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
        {
            name: 'Plástico',
            selector: row => row.plastico + '%',
        },
        {
            name: 'Papel',
            selector: row => row.papel + '%',
        },
        {
            name: 'Orgânico',
            selector: row => row.organico + '%',
        },
        {
            name: 'Ações',
            cell: row => (
                <button
                    onClick={() => openModal(row.planos)}
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    Detalhes
                </button>
            ),
        },
    ];

    const data = projectList.map(row => ({
        nome: row.nome,
        bairro: row.bairro,
        rua: row.rua,
        numero: row.numero,
        plastico: row.plastico,
        papel: row.papel,
        organico: row.organico,
        planos: row.planos,
    }));

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: 15,
            },
        },
    };

    return (
        <>
            <div className="flex flex-row items-center justify-between w-full mt-10">
                <h1 className="text-2xl font-bold text-gray-800 text-start">Lista de projetos</h1>
                <button onClick={handlePrint} className="flex items-center justify-center bg-white rounded-lg px-4 py-2">
                    <Printer size={24} color="#93C5FD" />
                </button>
            </div>

            <div className="w-full p-2 bg-white rounded-lg">
                <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                />
            </div>
            {modalIsOpen && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        width: '80%',
                        maxWidth: '400px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold', color: 'black' }}>Detalhes</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', color: 'black' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black', padding: '8px', background: '#f2f2f2', color: 'black', width: '25%' }}>Porcentagem</th>
                                    <th style={{ border: '1px solid black', padding: '8px', background: '#f2f2f2', color: 'black', width: '35%' }}>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedPlanos.map(plano => (
                                    <tr key={plano.id}>
                                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{plano.chave + '%'}</td>
                                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'R$ ' + plano.valor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={closeModal} style={{
                            marginTop: '1rem',
                            padding: '8px 16px',
                            backgroundColor: 'gray',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}>Fechar</button>
                    </div>
                </div>
            )}

        </>
    );
}
