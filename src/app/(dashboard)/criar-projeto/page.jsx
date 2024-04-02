'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CadastrarCadastrador() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [btnText, setBtnText] = useState('Cadastrar');


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }
    }, []);

    const clearForm = () => {
        setName('');
        setCity('');
        setNeighborhood('');
        setStreet('');
        setNumber('');

        setBtnText('Cadastrar');
    }

    const submitForm = async () => {
        setBtnText('Cadastrando...');

        const data = {
            nome: name,
            bairro: neighborhood,
            rua: street,
            numero: number,
            cidade: city
        }

        try {
            const response = await fetch('https://191.252.38.35:8443/api/projetos/salvar?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                setBtnText('Cadastrado!');
                console.log('Post created:', data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            clearForm();
        }, 2000);
    }

    return (

        <div className="flex flex-col justify-start items-start p-10 w-full gap-8 bg-white rounded-xl">

            <h1 className="text-3xl font-bold text-gray-800"> Criar projeto</h1>

            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center w-full gap-6 px-8">
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Nome do projeto" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="cidade" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Bairro" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                    <input type="text" placeholder="Rua" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={street} onChange={(e) => setStreet(e.target.value)} />
                    <input type="text" placeholder="Número" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <div className="flex flex-row justify-end w-full gap-4">
                    <button type="submit" className="flex items-center justify-center bg-primary px-8 py-2 rounded-lg">{btnText}</button>
                </div>
            </form>
        </div>
    );
}