'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";


export default function EditarUsuario({params}) {
    const userId = params.id;
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const { userData } = useAuth();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [btnText, setBtnText] = useState('Editar');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }

        getUser();
    }, []);

    const getUser = async () => {

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/usuarios/${userId}?login=${userData.login}&senha=${userData.senha}`);
            if (response.ok) {
                const data = await response.json();
                setName(data?.nome);
                setEmail(data?.email);
                setLogin(data?.login);
                setPassword(data?.senha);
                setTipoUsuario(data?.tipoUsuario);
            } else {
                console.error('Failed to fetch user');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setLogin('');
        setTipoUsuario('');

        setBtnText('Editar');
    }

    const submitForm = async () => {
        setBtnText('Editando...');

        const data = {
            nome: name,
            email: email,
            tipoUsuario: tipoUsuario,
            login: login,
            senha: password
        }

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/usuarios/${userId}?login=${userData.login}&senha=${userData.senha}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                setBtnText('Editado!');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            clearForm();
            window.location.href = '/v2/dashboard/';
        }, 2000);
    }

    return (

        <div className="flex flex-col justify-start items-start p-10 w-full gap-8 bg-white rounded-xl">

            <h1 className="text-3xl font-bold text-gray-800">Editar Usuário</h1>

            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center w-full gap-6 px-8">
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Nome" name="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="E-mail" name="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Usuário" name="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <input type="password" placeholder="Senha" name="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} className="bg-white w-1/2 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 text-black">
                        <option value="" disabled selected>Tipo de usuário</option>
                        {userData?.tipoUsuario === 'administradorgeral' ?
                            <>
                                <option value="administradorGeral">Administrador Geral</option>
                                <option value="cadastrador">Cadastrador</option>
                                <option value="equipe">Equipe</option>
                            </>
                            :
                            <>
                                <option value="equipe">Equipe</option>
                            </>
                        }

                    </select>
                </div>
                <div className="flex flex-row justify-end w-full gap-4">
                    <button type="submit" className="flex items-center justify-center bg-primary px-8 py-2 rounded-lg">{btnText}</button>
                </div>
            </form>
        </div>
    );
}