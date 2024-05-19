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


export default function EditarConsumo() {
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
    const [searchBtnText, setSearchBtnText] = useState('Buscar');
    const [mounth, setMounth] = useState('');
    const [year, setYear] = useState('');

    const [AddressEmission, setAddressEmission] = useState('');

    const [dataEmissions, setDataEmissions] = useState([]);

    const [emissoesEnergia, setEmissoesEnergia] = useState('');
    const [emissoesAgua, setEmissoesAgua] = useState('');
    const [emissoesResiduos, setEmissoesResiduos] = useState('');
    const [emissoesGas, setEmissoesGas] = useState('');

    const [selectedGas, setSelectedGas] = useState('');

    const [showClearBtn, setShowClearBtn] = useState(false);

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const [residuosKg, setResiduosKg] = useState('');
    const [daysOfMouth, setDaysOfMouth] = useState('');
    const [residuesPerPerson, setResiduesPerPerson] = useState('');

    const [getDate, setGetDate] = useState('');

    const [residuesFactors, setResiduesFactors] = useState('');
    const [energyFactors, setEnergyFactors] = useState('');

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
        const date = new Date(getDate);
        // const formattedDate = date.toLocaleDateString('en-GB');
        const formattedDate = getDate;

        console.log(formattedDate);

        setDateFormatted(formattedDate);

        if (formattedDate === '31/12/1969') {
            setGetDate('');
        } else {
            setGetDate(formattedDate);
        }

        setGetDate(formattedDate);

        const dateStr = formattedDate;
        const dateParts = dateStr.split("/");

        const month = dateParts[1];
        const year = dateParts[2];

        console.log('mes:', month, 'ano:', year);

        setMounth(month);
        setYear(year);

    }, [getDate]);

    // const formatDate = async () => {
    //     const date = new Date(getDate);
    //     const formattedDate = date.toLocaleDateString('en-GB');

    //     console.log(formattedDate);

    //     // setDateFormatted(formattedDate);

    //     // if (formattedDate === '31/12/1969') {
    //     //     setGetDate('');
    //     // } else {
    //     //     setGetDate(formattedDate);
    //     // }

    //     // setGetDate(formattedDate);

    //     const dateStr = date;
    //     const dateParts = dateStr?.split("/");

    //     const month = dateParts[1];
    //     const year = dateParts[2];

    //     console.log('mes:', month, 'ano:', year);

    //     setMounth(month);
    //     setYear(year);
    // }

    const handleChangeMounth = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleChange = (event) => {
        setSelectedYear(event.target.value);
    };

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
            const response = await fetch('http://191.252.38.35:8080/api/calculoEmissao/retornaUltimoCalculoDeEmissao?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify()
            });
            if (response.ok) {
                const data = await response.json();
                // setBtnText('Inserido residuo!');
                setEnergyFactors(data[1]?.valor);
                console.log('result:', data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        try {
            const response = await fetch('http://191.252.38.35:8080/api/residuos/retornaUltimoResiduos?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify()
            });
            if (response.ok) {
                const data = await response.json();
                // setBtnText('Inserido residuo!');
                setResiduesFactors(data);
                console.log('result ultimo residuo:', data[0].plastico);
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
        setProjeto('');
        setSelectedDate(null);
        setDateFormatted('');
        setEmissoesEnergia('');
        setEmissoesAgua('');
        setEmissoesResiduos('');
        setEmissoesGas('');
        setSelectedGas('');
        setSearchCpf('');
        setResiduosKg('');

        setBtnText('Cadastrar');
        setShowClearBtn(false);

    }

    const handleSearchBtn = async () => {
        setSearchBtnText('Buscando...');

        const dataSearch = searchCpf

        const dataEmissions = searchCpf


        try {
            const response = await fetch('http://191.252.38.35:8080/api/clientes/listarPorCpf?login=terrazul&senha=1234567', {
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
                setSearchBtnText('Encontrado!');
                setGetDate(data[0].cliente.data);
                setProjeto(data[0].cliente.projeto);
                toast.success('Busca concluída!');

            } else {
                console.error('Failed to create post');
                toast.error('ops! algo deu errado');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('ops! algo deu errado');
        }

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/consumos/retornaUltimoConsumo?login=terrazul&senha=1234567`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataEmissions)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('consumos:', data);
                setDataEmissions(data);
                setConsumoEnergia(data.listaEnergiaEletrica[0].consumo);
                setResiduosKg(data.listaResiduos[0].consumo);
                setConsumoGas(data.listaGas[0].consumo);
                setConsumoAgua(data.listaAgua[0].consumo);
                setGetDate(data.listaAgua[0].data);
                toast.success('Busca concluída!');
            } else {
                console.error('Failed to create post');
                toast.error('ops! algo deu errado');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('ops! algo deu errado');
        }

        setTimeout(() => {
            setSearchBtnText('Buscar');
        }, 2000);
    }

    const submitForm = async () => {
        setBtnText('Cadastrando...');

        console.log(dataEmissions);
        const emissions = dataEmissions;

        const emissionsEnergia = emissions.listaEnergiaEletrica[0]?.id;
        const emissionsGas = emissions.listaGas[0]?.id;
        const emissionsAgua = emissions.listaAgua[0]?.id;
        const emissionsResiduos = emissions.listaResiduos[0]?.id;

        // console.log(emissionsEnergia,emissionsGas,emissionsAgua,emissionsResiduos);

        const dataConsumoEnergia = {
            tipoEmissao: "energiaeletrica",
            nome: name,
            cpf: cpf,
            endereco: address,
            data: getDate,
            consumo: consumoEnergia,
            emissao: "0",
            taxaDeReducao: "0"
        }

        const dataConsumoAgua = {
            tipoEmissao: "agua",
            nome: name,
            cpf: cpf,
            endereco: address,
            data: getDate,
            consumo: consumoAgua,
            emissao: "0",
            taxaDeReducao: "0"
        }

        const dataConsumoResiduos = {
            tipoEmissao: "residuos",
            nome: name,
            cpf: cpf,
            endereco: address,
            data: getDate,
            consumo: residuosKg,
            emissao: "0",
            taxaDeReducao: "0"
        }
        const dataConsumoGas = {
            tipoGas: selectedGas,
            nome: name,
            cpf: cpf,
            endereco: address,
            data: getDate,
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
            const response = await fetch(`http://191.252.38.35:8080/api/consumos/${emissionsEnergia}?login=terrazul&senha=1234567`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataConsumoEnergia)
            });
            if (response.ok) {
                const data = await response.json();
                setEmissoesEnergia(data.emissao)
                try {
                    const response = await fetch(`http://191.252.38.35:8080/api/consumos/${emissionsAgua}?login=terrazul&senha=1234567`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataConsumoAgua)
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setEmissoesAgua(data.emissao)
                        try {
                            const response = await fetch(`http://191.252.38.35:8080/api/consumos/${emissionsResiduos}?login=terrazul&senha=1234567`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(dataConsumoResiduos)
                            });
                            if (response.ok) {
                                const data = await response.json();
                                setEmissoesResiduos(data.emissao)
                                try {
                                    const response = await fetch(`http://191.252.38.35:8080/api/consumos/${emissionsGas}/gas?login=terrazul&senha=1234567`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(dataConsumoGas)
                                    });
                                    if (response.ok) {
                                        const data = await response.json();
                                        setEmissoesGas(data.emissao)
                                        try {
                                            const response = await fetch('http://191.252.38.35:8080/api/emissoesMensal/atualizaUltimaEmissaoMensal?login=terrazul&senha=1234567', {
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
                                                toast.success('Cadastrado com sucesso!');
                                            } else {
                                                console.error('Failed to save mensal');
                                                toast.error('ops! algo deu errado ao atualizar emissões!');
                                            }
                                        } catch (error) {
                                            console.error('Error to save mensal emissions:', error);
                                            toast.error('ops! algo deu errado!');
                                        }
                                    } else {
                                        console.error('Failed to create post');
                                        toast.error('ops! algo deu errado ao editar gas!');
                                    }
                                } catch (error) {
                                    console.error('Error creating post:', error);
                                    toast.error('ops! algo deu errado ao editar gas!');
                                }
                            } else {
                                console.error('Failed to create post');
                                toast.error('ops! algo deu errado ao editar residuos!');
                            }
                        } catch (error) {
                            console.error('Error creating post:', error);
                            toast.error('ops! algo deu errado ao editar residuos!');
                        }
                    } else {
                        console.error('Failed to create post');
                        toast.error('ops! algo deu errado ao editar energia!');
                    }
                } catch (error) {
                    console.error('Error creating post:', error);
                    toast.error('ops! algo deu errado ao editar energia!');
                }
            } else {
                console.error('Failed to create post');
                toast.error('ops! algo deu errado ao editar energia!');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('ops! algo deu errado ao editar energia!');
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
        // const calculoEnergia = consumoEnergia * 0.0340 antigo com valor fixo
        const calculoEnergia = consumoEnergia * energyFactors
        const formatted = calculoEnergia.toFixed(2).replace(".", ",")
        setEmissoesEnergia(formatted)
    }

    const calculateResiduos = () => {
        // const papel = 10 / 100
        // const plastico = 21 / 100
        // const organico = 45 / 100

        const papel = residuesFactors[0]?.papel
        const plastico = residuesFactors[0]?.plastico
        const organico = residuesFactors[0]?.organico

        const days = 31

        if (mounth === '04' || mounth === '06' || mounth === '09' || mounth === '11') {
            setDaysOfMouth(30)
        } else if (mounth === '02') {
            setDaysOfMouth(28)
        } else {
            setDaysOfMouth(31)
        }

        const residuosKg = residuesPerPerson * daysOfMouth * habitantes

        const calcOrganico = residuosKg * 0.14 * organico * 1.33 * 28

        const residuosPapel = residuosKg * papel

        const residuosPlastico = residuosKg * plastico

        const calcPapel = 0.414 * residuosPapel * 3.67

        const calcPlastico = 0.75 * residuosPlastico * 3.67

        const calctotal = calcOrganico + calcPapel + calcPlastico

        // setResiduosKg(calculoResiduos)

        // console.log(calculoResiduos);

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
            <h1 className="text-2xl font-bold text-gray-800 text-start">Editar Consumo</h1>
            <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-8 my-4">
                <ReactInputMask required mask="999.999.999-99" maskChar="" placeholder='Digite o cpf do cliente' type="text" className="bg-white w-full lg:w-4/12 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={searchCpf} onChange={(e) => setSearchCpf(e.target.value)} />

                {/* <input type="text" placeholder="Endereço" value={AddressEmission} onChange={(e) => setAddressEmission(e.target.value)} name="" id="" className="bg-white w-full lg:w-4/12 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                <select value={selectedMonth} onChange={handleChangeMounth} className="bg-white  h-11 rounded-lg focus:outline-none border border-gray-700/45  text-black">
                    <option value="">Mês</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>

                <select value={selectedYear} onChange={handleChange} className="bg-white  h-11 rounded-lg focus:outline-none border border-gray-700/45  text-black">
                    <option value="">Ano</option>
                    {Array.from({ length: 20 }, (_, i) => 2021 + i).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select> */}
                <button type="button" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={() => handleSearchBtn()}>{searchBtnText}</button>
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
                                <input type="text" placeholder="Data" disabled name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" defaultValue={getDate} />
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

                    {/* <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 left-0 bg-green-600 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                    <h1 className="text-2xl font-bold text-gray-800">Dados contas de consumo</h1>

                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Código do cliente / energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="Titular de energia do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    </div>
                    <div className="flex flex-row w-full gap-4">
                        <input type="text" placeholder="Código do cliente / água" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                        <input type="text" placeholder="Titular de água do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    </div>
                    <input type="text" placeholder="Código do cliente / gas" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Titular de gás do cpf" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />

                </div> */}
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-8">
                    <div className="relative flex flex-col justify-start items-start p-10 w-full gap-4 bg-white rounded-xl">
                        <div className={`absolute top-0 left-0 bg-orange-400 w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>

                        <h1 className="text-2xl font-bold text-gray-800">Dados de consumo</h1>

                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Consumo de energia em kWh</label>
                                <input type="number" placeholder="Consumo de energia em kWh" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={consumoEnergia} onChange={(e) => setConsumoEnergia(e.target.value)} />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Consumo de água em m³</label>
                                <input type="number" placeholder="Consumo de água em m³" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={consumoAgua} onChange={(e) => setConsumoAgua(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4">
                            {/* <input type="number" placeholder="Geração de resíduos por pessoa em kg" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={residuesPerPerson} onChange={(e) => { setResiduesPerPerson(e.target.value), calculateResiduos() }} />
                            <input type="number" placeholder="numero de dias no mês" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={daysOfMouth} onChange={(e) => { setDaysOfMouth(e.target.value), calculateResiduos() }} /> */}
                            <div className="flex flex-col w-full gap-2 text-black text-sm ">
                                <label htmlFor="name">Geração de resíduos</label>
                                <input type="number" placeholder="Geração de resíduos em kg" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" defaultValue={residuosKg} />
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
                            <input type="number" placeholder="Consumo de gás em m³" name="" id="" className={`${selectedGas === 'encanado' ? 'block' : 'hidden'} bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black`} value={consumoGas} onChange={(e) => setConsumoGas(e.target.value)} />
                        ) : (
                            <input type="number" placeholder="Consumo de gás nº de botijões" name="" id="" className={`${selectedGas === 'botijao' ? 'block' : 'hidden'} bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black`} value={consumoGas} onChange={(e) => setConsumoGas(e.target.value)} />
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
                    <button type="submit" className="flex items-center justify-center bg-white text-primary px-8 py-2 rounded-lg" onClick={submitForm}>Cadastrar</button>
                </div>
            </form>
        </div>
    );
}