'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function CadastrarCliente() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const { userData, projectList, setProjectList } = useAuth();

    const [selectedProject, setSelectedProject] = useState();


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
    const [consumoResiduos, setconsumoResiduos] = useState('');
    const [projeto, setProjeto] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateFormatted, setDateFormatted] = useState('');
    const [btnText, setBtnText] = useState('Cadastrar');
    const [mounth, setMounth] = useState('');
    const [year, setYear] = useState('');

    const [emissoesEnergia, setEmissoesEnergia] = useState('');
    const [emissoesAgua, setEmissoesAgua] = useState('');
    const [emissoesResiduos, setEmissoesResiduos] = useState('');
    const [emissoesGas, setEmissoesGas] = useState('');

    const [co2Emissions, setCo2Emissions] = useState('');

    const [selectedGas, setSelectedGas] = useState('');

    const [showClearBtn, setShowClearBtn] = useState(false);

    const [residuosKg, setResiduosKg] = useState('');
    const [daysOfMouth, setDaysOfMouth] = useState('');
    const [residuesPerPerson, setResiduesPerPerson] = useState('');

    const handleGasChange = (event) => {
        setSelectedGas(event.target.value);
    };

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

    useEffect(() => {
        const date = new Date(selectedDate);
        const formattedDate = date.toLocaleDateString('en-GB');


        setDateFormatted(formattedDate);

        const dateStr = formattedDate;
        const dateParts = dateStr.split("/");

        const month = dateParts[1];
        const year = dateParts[2];

        setMounth(month);
        setYear(year);

    }, [selectedDate]);

    useEffect(() => {
        calculateAgua();
    }, [consumoAgua])

    useEffect(() => {
        calculateGas();
    }, [consumoGas])

    useEffect(() => {
        calculateEnergia();
    }, [consumoEnergia])

    useEffect(() => {
        calculateResiduos();
    }, [residuosKg])

    const clearForm = () => {
        setName('');
        setCpf('');
        setEmail('');
        setPhone('');
        setHabitantes('');
        setAddress('');
        setDate('');
        setCodEnergia('');
        setTitularEnergia('');
        setCodAgua('');
        setTitularAgua('');
        setCodGas('');
        setTitularGas('');
        setConsumoEnergia('');
        setConsumoAgua('');
        setConsumoGas('');
        setconsumoResiduos('');
        setProjeto('');
        setSelectedDate(null);
        setDateFormatted('');
        setEmissoesEnergia('');
        setEmissoesAgua('');
        setEmissoesResiduos('');
        setEmissoesGas('');
        setCo2Emissions('');
        setSelectedGas('');

        setBtnText('Cadastrar');
        setShowClearBtn(false);

    }

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
            data: dateFormatted,
            matriculaDeEnergia: codEnergia,
            titularEnergiaCpf: titularEnergia,
            matriculaDeAgua: codAgua,
            titularAguaCpf: titularAgua,
            matriculaDeGas: codGas,
            titularGasCpf: titularGas,

        }

        const dataConsumoEnergia = {
            tipoEmissao: "energiaeletrica",
            nome: name,
            cpf: cpf,
            endereco: address,
            data: dateFormatted,
            consumo: consumoEnergia,
            emissao: "0",
            taxaDeReducao: "0"
        }

        const dataConsumoAgua = {
            tipoEmissao: "agua",
            nome: name,
            cpf: cpf,
            endereco: address,
            data: dateFormatted,
            consumo: consumoAgua,
            emissao: "0",
            taxaDeReducao: "0"
        }

        const dataConsumoResiduos = {
            tipoEmissao: "residuos",
            nome: name,
            cpf: cpf,
            endereco: address,
            data: dateFormatted,
            consumo: residuosKg,
            emissao: "0",
            taxaDeReducao: "0"
        }
        const dataConsumoGas = {
            tipoGas: selectedGas,
            nome: name,
            cpf: cpf,
            endereco: address,
            data: dateFormatted,
            consumo: consumoGas,
            emissao: "0",
            taxaDeReducao: "0"
        }

        const dataEmissoesMensal = {
            nome: name,
            cpf: cpf,
            projeto: projeto,
            endereco: address,
            mes: mounth,
            ano: year,
            emissao: '0',
            taxaDeReducao: '0',
            beneficio: '0'
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
                const data = await response.json();
                // console.log('Post created:', data);
                try {
                    const response = await fetch('http://191.252.38.35:8080/api/consumos/salvar?login=terrazul&senha=1234567', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataConsumoEnergia)
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setEmissoesEnergia(data.emissao)
                        try {
                            const response = await fetch('http://191.252.38.35:8080/api/consumos/salvar?login=terrazul&senha=1234567', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(dataConsumoAgua)
                            });
                            if (response.ok) {
                                const data = await response.json();
                                setEmissoesAgua(data.emissao)
                                try {
                                    const response = await fetch('http://191.252.38.35:8080/api/consumos/salvar?login=terrazul&senha=1234567', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(dataConsumoResiduos)
                                    });
                                    if (response.ok) {
                                        const data = await response.json();
                                        setEmissoesResiduos(data.emissao)
                                        try {
                                            const response = await fetch('http://191.252.38.35:8080/api/consumos/salvarGas?login=terrazul&senha=1234567', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(dataConsumoGas)
                                            });
                                            if (response.ok) {
                                                const data = await response.json();
                                                setEmissoesGas(data.emissao)
                                                try {
                                                    const response = await fetch('http://191.252.38.35:8080/api/emissoesMensal/criaEmissaoMensal?login=terrazul&senha=1234567', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify(dataEmissoesMensal)
                                                    });
                                                    if (response.ok) {
                                                        const data = await response.json();
                                                        // setEmissoesMensal(data)
                                                        setBtnText('Cadastrado!');
                                                        setShowClearBtn(true);
                                                        toast.success('Cadastrado com sucesso!');
                                                        console.log('emissoes mensal:', data);
                                                    } else {
                                                        console.error('Failed to save mensal');
                                                        toast.error('ops! algo deu errado ao criar emissão mensal');
                                                    }
                                                } catch (error) {
                                                    console.error('Error to save mensal emissions:', error);
                                                    toast.error('ops! algo deu errado ao criar emissão mensal');
                                                }
                                            } else {
                                                console.error('Failed to save residuos');
                                                toast.error('ops! algo deu errado ao cadastrar o gás');
                                            }
                                        } catch (error) {
                                            console.error('Error creating post:', error);
                                            toast.error('ops! algo deu errado ao cadastrar o gás');
                                        }
                                    } else {
                                        console.error('Failed to create post');
                                        toast.error('ops! algo deu errado ao cadastrar o residuo');
                                    }
                                } catch (error) {
                                    console.error('Error creating post:', error);
                                    toast.error('ops! algo deu errado ao cadastrar o residuo');
                                }
                            } else {
                                console.error('Failed to save agua');
                                toast.error('ops! algo deu errado ao cadastrar a agua');
                            }
                        } catch (error) {
                            console.error('Error creating post:', error);
                            toast.error('ops! algo deu errado ao cadastrar a agua');
                        }
                    } else {
                        console.error('Failed to save energy');
                        toast.error('ops! algo deu errado ao cadastrar energia');
                    }
                } catch (error) {
                    console.error('Error creating post:', error);
                    toast.error('ops! algo deu errado ao cadastrar energia');
                }
            } else {
                console.error('Failed to save client');
                toast.error('ops! algo deu errado ao cadastrar o cliente');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('ops! algo deu errado ao cadastrar o cliente');
        }
    }

    const calculateGas = () => {
        if (selectedGas === "encanado") {
            const calculoGas = consumoGas * 1.59
            const formatted = calculoGas.toFixed(2).replace(".", ",")
            setEmissoesGas(formatted)
        } else {
            const calculoGas = consumoGas * 25.09
            const formatted = calculoGas.toFixed(2).replace(".", ",")
            setEmissoesGas(formatted)
            // setConsumoGas(consumoGasEletrico);
        }
    }

    const calculateAgua = () => {
        const calculoAgua = consumoAgua * 0.72
        const formatted = calculoAgua.toFixed(2).replace(".", ",")
        setEmissoesAgua(formatted)
    }

    const calculateEnergia = () => {
        const calculoEnergia = consumoEnergia * 0.0340
        const formatted = calculoEnergia.toFixed(2).replace(".", ",")
        setEmissoesEnergia(formatted)
    }

    const calculateResiduos = () => {
        const papel = 10 / 100
        const plastico = 21 / 100
        const organico = 45 / 100

        const calculoResiduos = residuesPerPerson * daysOfMouth * habitantes

        const calcOrganico = calculoResiduos * 0.14 * organico * 1.33 * 28

        const residuosPapel = calculoResiduos * papel

        const residuosPlastico = calculoResiduos * plastico

        const calcPapel = 0.414 * residuosPapel * 3.67

        const calcPlastico = 0.75 * residuosPlastico * 3.67

        const calctotal = calcOrganico + calcPapel + calcPlastico

        setResiduosKg(calculoResiduos)

        console.log(calculoResiduos);

        const formatted = calctotal.toFixed(2).replace(".", ",")

        setconsumoResiduos(toString(calctotal))
        setEmissoesResiduos(formatted)
    }

    const options = projectList?.map((project) => ({
        value: project.nome,
        label: project.nome
    }))

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-start justify-center w-full gap-8">
            <ToastContainer theme="colored" />
            <h1 className="text-2xl font-bold text-gray-800 text-start">Cadastrar Cliente</h1>
            <div className="flex flex-row justify-center items-center w-full gap-8">
                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados cadastrais</h1>


                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Nome completo" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={name} onChange={(e) => setName(e.target.value)} required />
                        <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='cpf' type="text" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={cpf} onChange={e => setCpf(e.target.value)} />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Endereço" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()} // Set the maximum date to today
                            placeholderText="data"
                            locale={ptBR}
                            className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                            required
                        />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="email" placeholder="Email" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <ReactInputMask required mask="(99)99999-9999" maskChar="" placeholder='Telefone' type="text" {...register('phone', {
                            pattern: {
                                value: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
                                message: "Insira um telefone válido"
                            },
                            required: true
                        })} className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="number" placeholder="Nº de Habitantes na residência" name="" id="" className="bg-white w-1/2 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={habitantes} onChange={(e) => setHabitantes(e.target.value)} required />
                        <Select options={options} placeholder="Projeto" onChange={(selectedOption) => setProjeto(selectedOption?.value)} className=" w-1/2 h-11 text-black" required />
                    </div>

                </div>

                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-green-600 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados contas de consumo</h1>

                    <div className="flex flex-row w-full gap-4">
                        <input type="number" placeholder="Código do cliente / energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={codEnergia} onChange={(e) => setCodEnergia(e.target.value)} required />
                        <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='cpf do titular' type="text" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={titularEnergia} onChange={e => setTitularEnergia(e.target.value)} />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="number" placeholder="Código do cliente / água" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={codAgua} onChange={(e) => setCodAgua(e.target.value)} required />
                        <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='cpf do titular' type="text" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={titularAgua} onChange={e => setTitularAgua(e.target.value)} />
                    </div>
                    <input type="number" placeholder="Código do cliente / gas" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={codGas} onChange={(e) => setCodGas(e.target.value)} required />
                    <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='cpf do titular' type="text" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={titularGas} onChange={e => setTitularGas(e.target.value)} />

                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full gap-8">
                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados de consumo - Marco zero</h1>

                    <input type="number" placeholder="Consumo de energia em kWh" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={consumoEnergia} onChange={(e) => setConsumoEnergia(e.target.value)} required />
                    <input type="number" placeholder="Consumo de água em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={consumoAgua} onChange={(e) => setConsumoAgua(e.target.value)} required />
                    <div className="flex flex-row w-full gap-4">
                        <input type="number" placeholder="Geração de resíduos por pessoa em kg" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={residuesPerPerson} onChange={(e) => { setResiduesPerPerson(e.target.value), calculateResiduos() }} required />
                        <input type="number" placeholder="numero de dias no mês" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={daysOfMouth} onChange={(e) => { setDaysOfMouth(e.target.value), calculateResiduos() }} required />
                        <input type="number" placeholder="Geração de resíduos em kg" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" defaultValue={residuosKg} required />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-normal mb-2 text-black" htmlFor="gas">
                            Tipo de Gas:
                        </label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="gasEncanado"
                                name="gas"
                                value="encanado"
                                checked={selectedGas === 'encanado'}
                                onChange={(e) => setSelectedGas(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="gasEncanado" className="mr-4 text-black">
                                Gas Encanado
                            </label>
                            <input
                                type="radio"
                                id="botijao"
                                name="gas"
                                value="botijao"
                                checked={selectedGas === 'botijao'}
                                onChange={(e) => setSelectedGas(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="botijao" className="mr-4 text-black">Botijão</label>
                        </div>
                    </div>
                    {selectedGas === 'encanado' ? (
                        <input type="number" placeholder="Consumo de gás em m³" name="" id="" className={`${selectedGas === 'encanado' ? 'block' : 'hidden'} bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black`} value={consumoGas} onChange={(e) => setConsumoGas(e.target.value)} />
                    ) : (
                        <input type="number" placeholder="Consumo de gás nº de botijões" name="" id="" className={`${selectedGas === 'botijao' ? 'block' : 'hidden'} bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black`} value={consumoGas} onChange={(e) => setConsumoGas(e.target.value)} />
                    )}

                </div>

                <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados de emissões</h1>

                    <input type="text" disabled placeholder="Kg CO2e Energia" defaultValue={emissoesEnergia} name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" disabled placeholder="Kg CO2e Água" defaultValue={emissoesAgua} name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" disabled placeholder="Kg CO2e Resíduos" defaultValue={emissoesResiduos} name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" disabled placeholder="Kg CO2e Gás " defaultValue={emissoesGas} name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    {/* <input type="text" disabled placeholder="Kg CO2e Gás nº de botijões" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" /> */}

                </div>
            </div>
            <div className="flex flex-row justify-end items-center w-full gap-8">
                {showClearBtn ? <button type="button" className="flex items-center justify-center bg-green-700 px-8 py-2 rounded-lg" onClick={clearForm}>Limpar dados</button> : ''}
                <button type="submit" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg">{btnText}</button>
            </div>
        </form>
    );
}