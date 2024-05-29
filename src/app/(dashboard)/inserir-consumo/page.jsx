'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';
import ReactDatePicker from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function InserirConsumo() {
    const router = useRouter();

    const { userData, projectList, setProjectList, setIsLoading } = useAuth();

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
    const [consumoResiduos, setconsumoResiduos] = useState('');
    const [projeto, setProjeto] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateFormatted, setDateFormatted] = useState('');
    const [searchCpf, setSearchCpf] = useState('');
    const [btnText, setBtnText] = useState('Cadastrar');
    const [searchBtnText, setSearchBtnText] = useState('Buscar CPF');
    const [mounth, setMounth] = useState('');
    const [year, setYear] = useState('');

    const [emissoesEnergia, setEmissoesEnergia] = useState('');
    const [emissoesAgua, setEmissoesAgua] = useState('');
    const [emissoesResiduos, setEmissoesResiduos] = useState('');
    const [emissoesGas, setEmissoesGas] = useState('');

    const [selectedGas, setSelectedGas] = useState('');

    const [showClearBtn, setShowClearBtn] = useState(false);

    const [residuosKg, setResiduosKg] = useState('');
    const [consumptionOfMouth, setConsumptionOfMouth] = useState('');
    const [residuesPerPerson, setResiduesPerPerson] = useState('');

    const [getDate, setGetDate] = useState('');

    const [residuesFactors, setResiduesFactors] = useState('');
    const [energyFactors, setEnergyFactors] = useState('');
    const [factors, setFactors] = useState([]);

    const [papel, setPapel] = useState('');
    const [organico, setOrganico] = useState('');
    const [plastico, setPlastico] = useState('');


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }

        setIsLoading(false)
        getEmissions();
    }, []);

    useEffect(() => {
        const date = new Date(selectedDate);
        const formattedDate = date.toLocaleDateString('en-GB');

        console.log(formattedDate);

        setDateFormatted(formattedDate);

        if (formattedDate === '31/12/1969') {
            setGetDate('');
        } else {
            setGetDate(formattedDate);
        }

        // setGetDate(formattedDate);

        const dateStr = formattedDate;
        const dateParts = dateStr.split("/");

        const month = dateParts[1];
        const year = dateParts[2];

        console.log('mes:', month, 'ano:', year);

        setMounth(month);
        setYear(year);

        // const energyDate = `${year}-${month}-01`;
        const factorsDate = factors

        const filteredDate = factorsDate?.filter(obj => obj.data === `${month}/${year}` && obj.tipoEmissao === "energiaeletrica");

        console.log(filteredDate[0]?.valor);

        setEnergyFactors(filteredDate[0]?.valor);

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

    const getEmissions = async () => {

        try {
            const response = await fetch('http://191.252.38.35:8080/api/calculoEmissao/listar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();
                setFactors(data);
                console.log('result:', data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/residuos/retornaUltimoResiduos?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                const data = await response.json();
                setResiduesFactors(data);
                setPapel(data[0].papel);
                setOrganico(data[0].organico);
                setPlastico(data[0].plastico);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

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
        setSelectedDate(null);
        setDateFormatted('');
        setEmissoesEnergia('');
        setEmissoesAgua('');
        setEmissoesResiduos('');
        setEmissoesGas('');
        setSelectedGas('');
        setSearchCpf('');

        setBtnText('Cadastrar');
        setShowClearBtn(false);

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
                console.log('Data searched:', data[0]);
                setName(data[0].cliente.nome);
                setCpf(data[0].cliente.cpf);
                setEmail(data[0].cliente.email);
                setPhone(data[0].cliente.telefone);
                setHabitantes(data[0].cliente.habitantes);
                setAddress(data[0].cliente.endereco);
                setResiduesPerPerson(data[0].marcoZero[3].consumo)
                setSearchBtnText('Buscar CPF');
                toast.success('Busca concluída!');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            setSearchBtnText('Buscar CPF');
        }, 2000);
    }

    const submitForm = async () => {
        setBtnText('Cadastrando...');

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
            const response = await fetch(`http://191.252.38.35:8080/api/consumos/salvar?login=${userData.login}&senha=${userData.senha}`, {
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
                    const response = await fetch(`http://191.252.38.35:8080/api/consumos/salvar?login=${userData.login}&senha=${userData.senha}`, {
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
                            const response = await fetch(`http://191.252.38.35:8080/api/consumos/salvar?login=${userData.login}&senha=${userData.senha}`, {
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
                                    const response = await fetch(`http://191.252.38.35:8080/api/consumos/salvarGas?login=${userData.login}&senha=${userData.senha}`, {
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
                                            const response = await fetch(`http://191.252.38.35:8080/api/emissoesMensal/criaEmissaoMensal?login=${userData.login}&senha=${userData.senha}`, {
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
                                                console.log('emissoes mensal:', data);
                                            } else {
                                                console.error('Failed to save mensal');
                                            }
                                        } catch (error) {
                                            console.error('Error to save mensal emissions:', error);
                                        }
                                    } else {
                                        console.error('Failed to create post');
                                    }
                                } catch (error) {
                                    console.error('Error creating post:', error);
                                }
                            } else {
                                console.error('Failed to create post');
                            }
                        } catch (error) {
                            console.error('Error creating post:', error);
                        }
                    } else {
                        console.error('Failed to create post');
                    }
                } catch (error) {
                    console.error('Error creating post:', error);
                }
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
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
        }
    }

    const calculateAgua = () => {
        const calculoAgua = consumoAgua * 0.72
        const formatted = calculoAgua.toFixed(2).replace(".", ",")
        setEmissoesAgua(formatted)
    }

    const calculateEnergia = () => {
        const calculoEnergia = consumoEnergia * energyFactors
        const formatted = calculoEnergia.toFixed(2).replace(".", ",")
        setEmissoesEnergia(formatted)
    }

    const calculateResiduos = () => {

        console.log('papel:', papel, 'plastico:', plastico, 'organico:', organico);

        const calculoResiduos = residuesPerPerson - consumptionOfMouth

        const calcOrganico = calculoResiduos * 0.14 * organico * 1.33 * 28

        const residuosPapel = calculoResiduos * papel

        const residuosPlastico = calculoResiduos * plastico

        const calcPapel = 0.414 * residuosPapel * 3.67

        const calcPlastico = 0.75 * residuosPlastico * 3.67

        const calctotal = calcOrganico + calcPapel + calcPlastico

        setResiduosKg(calculoResiduos)

        const formatted = calctotal.toFixed(2).replace(".", ",")

        setEmissoesResiduos(formatted)
    }

    const options = projectList?.map((project) => ({
        value: project.nome,
        label: project.nome
    }))

    return (
        <div className="flex flex-col items-start justify-center w-full gap-8">
            <ToastContainer theme="colored" />
            <h1 className="text-2xl font-bold text-gray-800 text-start">Inserir Consumo</h1>
            <div className="flex flex-row justify-center items-center w-full gap-8 my-4">
                <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='Digite o cpf do cliente' type="text" className="bg-white w-1/2 lg:w-4/12 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={searchCpf} onChange={(e) => setSearchCpf(e.target.value)} />
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={handleSearchBtn} >{searchBtnText}</button>
            </div>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center w-full gap-6 px-8">

                <div className="flex flex-row justify-center items-center w-full gap-8">
                    <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                        <div className={`absolute top-0 left-0 bg-blue-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                        <h1 className="text-2xl font-bold text-gray-800">Dados cadastrais</h1>

                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Nome completo</label>
                                <input type="text" placeholder="Nome completo" disabled name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">CPF</label>
                                <ReactInputMask required mask="999.999.999-99" disabled maskChar="" placeholder='cpf' type="text" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={cpf} onChange={e => setCpf(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Endereço</label>
                                <input type="text" placeholder="Endereço" disabled name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Data</label>
                                <ReactDatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    value={getDate}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()} // Set the maximum date to today
                                    placeholderText="data"
                                    locale={ptBR}
                                    className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Email</label>
                                <input type="email" placeholder="Email" disabled name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Telefone</label>
                                <ReactInputMask required mask="(99)99999-9999" disabled maskChar="" placeholder='Telefone' type="text" {...register('phone', {
                                    pattern: {
                                        value: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
                                        message: "Insira um telefone válido"
                                    },
                                    required: true
                                })} className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Nº de Habitantes</label>
                                <input type="number" placeholder="Nº de Habitantes na residência" disabled name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={habitantes} onChange={(e) => setHabitantes(e.target.value)} />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Projeto</label>
                                <Select options={options} defaultValue={projeto} onChange={(selectedOption) => setProjeto(selectedOption?.value)} className=" w-full h-11 text-black" required />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-8">
                    <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                        <div className={`absolute top-0 left-0 bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                        <h1 className="text-2xl font-bold text-gray-800">Dados de consumo</h1>

                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Consumo de Energia</label>
                                <input type="number" placeholder="Consumo de energia em kWh" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={consumoEnergia} onChange={(e) => setConsumoEnergia(e.target.value)} required />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Consumo de água</label>
                                <input type="number" placeholder="Consumo de água em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={consumoAgua} onChange={(e) => { setConsumoAgua(e.target.value) }} required />
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Resíduos inicial</label>
                                <input type="number" placeholder="Geração de resíduos inicial" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" disabled value={parseFloat(residuesPerPerson).toFixed(2)} onChange={(e) => { setResiduesPerPerson(e.target.value), calculateResiduos() }} />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Consumo do mês</label>
                                <input type="number" placeholder="Consumo do mês" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={consumptionOfMouth} onChange={(e) => { setConsumptionOfMouth(e.target.value), calculateResiduos() }} required />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Resíduos final</label>
                                <input type="number" disabled placeholder="Geração de resíduos em kg" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" defaultValue={residuosKg} />
                            </div>
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
                            <input type="number" placeholder="Consumo de gás em m³" name="" id="" className={`${selectedGas === 'encanado' ? 'block' : 'hidden'} bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black`} value={consumoGas} onChange={(e) => { setConsumoGas(e.target.value), calculateGas() }} />
                        ) : (
                            <input type="number" placeholder="Consumo de gás nº de botijões" name="" id="" className={`${selectedGas === 'botijao' ? 'block' : 'hidden'} bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black`} value={consumoGas} onChange={(e) => { setConsumoGas(e.target.value), calculateGas() }} />
                        )}

                    </div>

                    <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                        <div className={`absolute top-0 left-0 bg-red-500 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                        <h1 className="text-2xl font-bold text-gray-800">Dados de emissões</h1>

                        <div className="flex flex-col w-full gap-2 text-black text-sm ">
                            <label htmlFor="name">Energia</label>
                            <input type="text" placeholder="Kg CO2e Energia" disabled defaultValue={emissoesEnergia} name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        </div>

                        <div className="flex flex-col w-full gap-2 text-black text-sm ">
                            <label htmlFor="name">Agua</label>
                            <input type="text" placeholder="Kg CO2e Água" disabled defaultValue={emissoesAgua} name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        </div>

                        <div className="flex flex-col w-full gap-2 text-black text-sm ">
                            <label htmlFor="name">Resíduos</label>
                            <input type="text" placeholder="Kg CO2e Resíduos" disabled defaultValue={emissoesResiduos} name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        </div>
                        <div className="flex flex-col w-full gap-2 text-black text-sm ">
                            <label htmlFor="name">Gás</label>
                            <input type="text" placeholder="Kg CO2e Gás" disabled defaultValue={emissoesGas} name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        </div>

                    </div>
                </div>
                <div className="flex flex-row justify-end items-center w-full gap-8">
                    {showClearBtn ? <button type="button" className="flex items-center justify-center bg-green-700 px-8 py-2 rounded-lg" onClick={clearForm}>Limpar dados</button> : ''}
                    <button type="submit" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={submitForm}>{btnText}</button>
                </div>
            </form>
        </div>
    );
}