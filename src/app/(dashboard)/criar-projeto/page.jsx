'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select'

export default function CadastrarCadastrador() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [btnText, setBtnText] = useState('Cadastrar');
    const [porcentagem, setPorcentagem] = useState('');
    const [valor, setValor] = useState('R$ 0,00');
    const [papel, setPapel] = useState('');
    const [plastico, setPlastico] = useState('');
    const [organico, setOrganico] = useState('');
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }

        setUserData(JSON.parse(user))
    }, []);

    const clearForm = () => {
        setName('');
        setCity('');
        setNeighborhood('');
        setStreet('');
        setNumber('');
        setPorcentagem('');
        setValor('R$ 0,00');
        setPapel('');
        setPlastico('');
        setOrganico('');
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
            porcentagem: porcentagem,
            valor: valor,
            papel: papel,
            plastico: plastico,
            organico: organico
        }

        try {
            console.log(userData)
            const response = await fetch(`http://191.252.38.35:8080/api/projetos/salvar?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setBtnText('Cadastrado!');

                setTimeout(() => {
                    clearForm();
                }, 2000);
            } else {
                setBtnText('Cadastrar')
                console.error('Failed to create post');
            }
        } catch (error) {
            setBtnText('Cadastrar')
            console.error('Error creating post:', error);
        }
    }


    const formatMoney = (value) => {
        let val = value.replace(/\D/g, '');
        val = (Number(val) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return val;
    };

    const handleValorChange = (e) => {
        const newValue = formatMoney(e.target.value);
        setValor(newValue);
    };

    return (
        <div className="flex flex-col justify-start items-start p-10 w-full gap-8 bg-white rounded-xl">
            <h1 className="text-3xl font-bold text-gray-800">Criar projeto</h1>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-start justify-center w-full gap-6 px-8">
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Nome do projeto" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={name} onChange={(e) => setName(e.target.value)} title="Nome do projeto" />
                    <input type="text" placeholder="Cidade" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={city} onChange={(e) => setCity(e.target.value)} title="Cidade" />
                </div>
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Bairro" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} title="Bairro" />
                    <input type="text" placeholder="Rua" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={street} onChange={(e) => setStreet(e.target.value)} title="Rua" />
                    <input type="text" placeholder="Número" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={number} onChange={(e) => setNumber(e.target.value)} title="Número" />
                </div>
                <div className="flex flex-row w-full gap-4">
                    <input type="number" min="1" max="10" placeholder="(% Plano)"
                        className="bg-white w-28 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                        value={porcentagem} onChange={(e) => setPorcentagem(e.target.value)} title="Plano (%)" />
                    <input type="text" placeholder="Valor (R$)"
                        className="bg-white w-36 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                        value={valor} onChange={handleValorChange} title="Valor (R$)" />
                    <input type="number" min="1" max="100" placeholder="Papel (%)"
                        className="bg-white w-28 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                        value={papel} onChange={(e) => setPapel(e.target.value)} title="Papel (%)" />
                    <input type="number" min="1" max="100" placeholder="Plástico (%)"
                        className="bg-white w-28 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                        value={plastico} onChange={(e) => setPlastico(e.target.value)} title="Plástico (%)" />
                    <input type="number" min="1" max="100" placeholder="Orgânico (%)"
                        className="bg-white w-28 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                        value={organico} onChange={(e) => setOrganico(e.target.value)} title="Orgânico (%)" />
                </div>
                <div className="flex justify-end w-full">
                    <button type="submit" className="flex items-center justify-center bg-primary px-8 py-2 rounded-lg">{btnText}</button>
                </div>
            </form>
        </div>
    );
}