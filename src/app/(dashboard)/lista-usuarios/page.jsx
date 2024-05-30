'use client'
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DataTable from 'react-data-table-component';
import EditUser from "@/components/EditUser";

export default function ListarProjetos() {

    const { userData, projectList, setProjectList, editUserPopUp, setEditUserPopUp, setIsLoading } = useAuth();

    const [usersList, setUsersList] = useState([]);
    const [user, setUser] = useState({});
    const [editUserId, setEditUserId] = useState('');

    useEffect(() => {
        getUsers();
        setIsLoading(false)
    }, [])

    const getUsers = async () => {

        const data = userData

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/usuarios/listar?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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

    const handleEditUser = (user) => {
        setEditUserId(user);
        setEditUserPopUp(true);
    }

    const columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Login',
            selector: row => row.login,
        },
        {
            name: 'Tipo de usuário',
            selector: row => row.tipoUsuario,
        },
        {
            name: 'Ação',
            selector: row => row.id,
            cell: (row) => {
                return (
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            title="Editar"
                            type="button"
                            rel="noreferrer"
                            className="flex justify-center items-center gap-2 text-white px-4 h-10 bg-primary rounded-lg"
                            onClick={() => handleEditUser(row.id)}
                        >
                            Editar
                        </button>
                    </div>
                )
            },
        },
    ];

    const data = usersList?.map(row => ({
        nome: row.nome,
        email: row.email,
        login: row.login,
        tipoUsuario: row.tipoUsuario,
        id: row.id
    }))

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 text-start">Usuários cadastrados</h1>

            <div className="w-full p-2 bg-white rounded-lg">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
            {editUserPopUp && <EditUser id={editUserId} />}
        </>
    )
}