'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';

export default function CadastrarCliente() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [habitantes, setHabitantes] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [codEnergia, setCodEnergia] = useState('');
    const [titularEnergia, setTitularEnergia] = useState('');
    const [codAgua, setCodAgua] = useState('');
    const [titularAgua, setTitularAgua] = useState('');
    const [codGas, setCodGas] = useState('');
    const [titularGas, setTitularGas] = useState('');
    const [consumoEnergia, setConsumoEnergia] = useState('');
    const [consumoAgua, setConsumoAgua] = useState('');
    const [consumoGas, setConsumoGas] = useState('');
    const [geracaoResiduos, setGeracaoResiduos] = useState('');
    const [projeto, setProjeto] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [btnText, setBtnText] = useState('Cadastrar');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const minDate = subDays(new Date(), 0);


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }
    }, []);

    const submitForm = async () => {
        setBtnText('Cadastrando...');

        const data = {
            nome: name,
            cpf: cpf,
            email: email,
            telefone: phone,
            habitantes: habitantes,
            projeto: projeto,
            endereco: address,
            data: selectedDate.toISOString().slice(0, 10),
            matriculaDeEnergia: codEnergia,
            titularEnergiaCpf: titularEnergia,
            matriculaDeAgua: codAgua,
            titularAguaCpf: titularAgua,
            matriculaDeGas: codGas,
            titularGasCpf: titularGas,

        }

        const dataConsumo = {
            consumoEnergia,
            consumoAgua,
            consumoGas,
            geracaoResiduos
        }

        try {
            const response = await fetch('http://191.252.38.35:8080/api/clientes/salvar?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                // console.log('Post created:', data);
                const data = await response.json();
                console.log('Post created:', data);
                setBtnText('Cadastrado!');
                // localStorage.setItem('user', JSON.stringify(data));
                // router.push('/dashboard');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-start justify-center w-full gap-8">
            <h1 className="text-2xl font-bold text-gray-800 text-start">Cadastrar Cliente</h1>
            <div className="flex flex-row justify-center items-center w-full gap-8">
                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados cadastrais</h1>


                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Nome completo" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setName(e.target.value)} />
                        <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='cpf' type="text" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={cpf} onChange={e => setCpf(e.target.value)} />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Endereço" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setAddress(e.target.value)} />
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            maxDate={new Date()} // Set the maximum date to today
                            placeholderText="data"
                            className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                        />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Email" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setEmail(e.target.value)} />
                        <ReactInputMask required mask="(99)99999-9999" maskChar="" placeholder='Telefone' type="text" {...register('phone', {
                            pattern: {
                                value: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
                                message: "Insira um telefone válido"
                            },
                            required: true
                        })} className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="number" placeholder="Nº de Habitantes na residência" name="" id="" className="bg-white w-1/2 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setHabitantes(e.target.value)} />
                        <select id="mySelect" value={projeto} onChange={(e) => setProjeto(e.target.value)} className="bg-white w-1/2 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 text-black">
                            <option value="" disabled selected>Projeto</option>
                            <option value="Projeto 1">Projeto 1</option>
                            <option value="Projeto 2">Projeto 2</option>
                        </select>
                    </div>

                </div>

                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-green-600 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados contas de consumo</h1>

                    <div className="flex flex-row w-full gap-4">
                        <input type="number" placeholder="Código do cliente / energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setCodEnergia(e.target.value)} />
                        <input type="text" placeholder="Titular de energia do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setTitularEnergia(e.target.value)} />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="number" placeholder="Código do cliente / água" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setCodAgua(e.target.value)} />
                        <input type="text" placeholder="Titular de água do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setTitularAgua(e.target.value)} />
                    </div>
                    <input type="number" placeholder="Código do cliente / gas" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setCodGas(e.target.value)} />
                    <input type="text" placeholder="Titular de gás do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setTitularGas(e.target.value)} />

                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full gap-8">
                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados de consumo - Marco zero</h1>

                    <input type="number" placeholder="Consumo de energia em kWh" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setConsumoEnergia(e.target.value)} />
                    <input type="number" placeholder="Consumo de água em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setConsumoAgua(e.target.value)} />
                    <input type="number" placeholder="Geração de resíduos em kg" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setGeracaoResiduos(e.target.value)} />
                    <input type="number" placeholder="Consumo de gás em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setConsumoGas(e.target.value)} />
                    <input type="number" placeholder="Consumo de gás nº de botijões" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" onChange={(e) => setConsumoGas(e.target.value)} />

                </div>

                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados de emissões</h1>

                    <input type="text" disabled placeholder="Kg CO2e Energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" disabled placeholder="Kg CO2e Água" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" disabled placeholder="Kg CO2e Resíduos" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" disabled placeholder="Kg CO2e Gás em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" disabled placeholder="Kg CO2e Gás nº de botijões" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />

                </div>
            </div>
            <div className="flex flex-row justify-end items-center w-full gap-8">
                <button type="submit" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg">{btnText}</button>
            </div>
        </form>
    );
}