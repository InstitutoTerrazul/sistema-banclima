'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Select from 'react-select'



export default function CadastrarCadastrador() {
    const router = useRouter();

    const { setIsLoading } = useAuth();


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [plan, setPlan] = useState('');
    const [btnText, setBtnText] = useState('Cadastrar');


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }

        setIsLoading(false);
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
            cidade: city,
            plano: plan
        }

        try {
            const response = await fetch('http://191.252.38.35:8080/api/projetos/salvar?login=terrazul&senha=1234567', {
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

    const plans = [
        {
            id: 1,
            name: 'Plano 1',
            description: `1% - R$5,00
                        2% - R$10,00
                        3% - R$15,00
                        4% - R$ 20,00
                        5% - R$ 25,00
                        6% - R$ 30,00
                        7% - R$ 35,00
                        8% - R$ 40,00
                        9% - R$ 45,00
                        10% - R$ 50,00`
        },
        {
            id: 2,
            name: 'Plano 2',
            description: `1% - R$20,00
                        2% - R$40,00
                        3% - R$60,00
                        4% - R$ 80,00
                        5% - R$ 100,00
                        6% - R$ 120,00
                        7% - R$ 140,00
                        8% - R$ 160,00
                        9% - R$ 180,00
                        10% - R$ 200,00`
        },
        {
            id: 3,
            name: 'Plano 3',
            description: `1% - R$25,00
                        2% - R$50,00
                        3% - R$75,00
                        4% - R$ 100,00
                        5% - R$ 125,00
                        6% - R$ 150,00
                        7% - R$ 175,00
                        8% - R$ 200,00
                        9% - R$ 225,00
                        10% - R$ 250,00`
        }
    ]

    const options = plans?.map((plan) => ({
        value: plan.name,
        label: plan.name
    }))

    return (

        <div className="flex flex-col justify-start items-start p-10 w-full gap-8 bg-white rounded-xl">

            <h1 className="text-3xl font-bold text-gray-800"> Criar projeto</h1>

            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-start justify-center w-full gap-6 px-8">
                <div className="flex flex-row w-full gap-4">
                    <div className="flex flex-col w-full gap-2 text-black text-sm ">
                        <label htmlFor="">Nome do projeto</label>
                        <input type="text" placeholder="Nome do projeto" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col w-full gap-2 text-black text-sm ">
                        <label htmlFor="">Cidade</label>
                        <input type="text" placeholder="cidade" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row w-full gap-4">
                    <div className="flex flex-col w-full gap-2 text-black text-sm ">
                        <label htmlFor="">Bairro</label>
                        <input type="text" placeholder="Bairro" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                    </div>
                    <div className="flex flex-col w-full gap-2 text-black text-sm ">
                        <label htmlFor="">Rua</label>
                        <input type="text" placeholder="Rua" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div className="flex flex-col w-full gap-2 text-black text-sm ">
                        <label htmlFor="">Número</label>
                        <input type="text" placeholder="Número" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={number} onChange={(e) => setNumber(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2 text-black text-sm ">
                    <label htmlFor="">Selecione o plano</label>
                    <Select options={options} placeholder="Selecione um plano" aria-label="Selecione o plano" label="Selecione o plano" onChange={(selectedOption) => setPlan(selectedOption?.value)} className=" w-1/2 h-11 text-black" required />
                </div>

                {/* <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="%inicial" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                    <input type="text" placeholder="%final" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={street} onChange={(e) => setStreet(e.target.value)} />
                    <input type="text" placeholder="Taxa de beneficio" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div> */}
                <div className="flex flex-row justify-end w-full gap-4">
                    <button type="submit" className="flex items-center justify-center bg-primary px-8 py-2 rounded-lg">{btnText}</button>
                </div>
            </form>

            <div className="flex flex-col text-black px-8 gap-4">
                <span>Planos:</span>
                {plans?.map((plan) => (
                    <div key={plan.id} className="flex flex-col gap-2">
                        <span key={plan.name} className="text-sm text-bold">{plan.name} :</span>
                        <span className="text-sm">{plan.description}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}