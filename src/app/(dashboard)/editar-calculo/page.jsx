'use client'
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';



export default function EditarCalculo() {
    const [tableData, setTableData] = useState([]);
    const [energia, setEnergia] = useState('');
    const [papel, setPapel] = useState('');
    const [plastico, setPlastico] = useState('');
    const [organico, setOrganico] = useState('');
    const [btnText, setBtnText] = useState('Inserir');
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateFormatted, setDateFormatted] = useState('');
    const [mounth, setMounth] = useState('');
    const [year, setYear] = useState('');


    const { userData } = useAuth();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        searchValues()
    }, [])

    const searchValues = async () => {
        // setSearchBtnText('Buscando...');
        console.log('User data:', userData);

        const dataSearch = userData


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
                console.log('Data searched:', data);
                setTableData(data);
                // setTableData(data);
                // setSearchBtnText('CPF encontrado!');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        try {
            const response = await fetch('http://191.252.38.35:8080/api/residuos/listar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Data residuos:', data);
                // setTableData(data);
                // setTableData(data);
                // setSearchBtnText('CPF encontrado!');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            // setSearchBtnText('Buscar');
            // setSearchCpf('');
        }, 2000);
    }

    const submitForm = async () => {
        setBtnText('Inserindo...');

        // const currentDate = new Date();
        // const day = String(currentDate.getDate()).padStart(2, '0');
        // const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        // const year = currentDate.getFullYear();

        // const formattedDate = `${month}/${year}`;
        const formattedDate = `${mounth}/${year}`
        console.log(formattedDate); // Output: e.g. "01/12/2022"

        const dataEnergia = {
            data: formattedDate,
            tipoEmissao: 'energiaeletrica',
            valor: energia
        }

        const dataResiduos = {
            data: formattedDate,
            papel,
            plastico,
            organico
        }

        try {
            const response = await fetch('http://191.252.38.35:8080/api/calculoEmissao/salvar?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataEnergia)
            });
            if (response.ok) {
                const data = await response.json();
                setBtnText('Inserido!');
                console.log('Post created:', data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        try {
            const response = await fetch('http://191.252.38.35:8080/api/residuos/salvar?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataResiduos)
            });
            if (response.ok) {
                const data = await response.json();
                setBtnText('Inserido residuo!');
                console.log('Post created:', data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            setBtnText('Inserir');
            // setSearchCpf('');
        }, 2000);

    }

    const columns = [
        {
            name: 'Tipo de Emissão',
            selector: row => row.tipoEmissao,
        },
        {
            name: 'Valor',
            selector: row => row.valor,
        },
        {
            name: 'Mês/Ano',
            selector: row => row.data,
        },
    ];

    const data = tableData.map(row => ({
        valor: row.valor,
        data: row.data,
        tipoEmissao: row.tipoEmissao,
    }))

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

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

    // const data = [
    //     {
    //         TipoEmissao: 'Agua',
    //         valor: '0.75',
    //         mesAno: '02/2024',
    //     },
    //     {
    //         TipoEmissao: 'Energia',
    //         valor: '0.75',
    //         mesAno: '02/2024',
    //     },
    //     {
    //         TipoEmissao: 'Gás',
    //         valor: '0.75',
    //         mesAno: '02/2024',
    //     },
    //     {
    //         TipoEmissao: 'Residuos',
    //         valor: '0.75',
    //         mesAno: '02/2024',
    //     },
    // ]

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 text-start">Editar Fatores de Emissão</h1>

            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-end justify-center gap-4 bg-white rounded-xl p-10">

                {/* <div className="flex flex-row justify-center items-center w-full gap-8 my-4">
                    <input type="text" placeholder="Agua" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                    <input type="text" placeholder="Gás" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" />
                </div> */}
                <div className="flex flex-row justify-center items-center w-full gap-8">
                    <input type="text" placeholder="Energia" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={energia} onChange={(e) => setEnergia(e.target.value)} />
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MM/yyyy"
                        maxDate={new Date()} // Set the maximum date to today
                        placeholderText="data"
                        locale={ptBR}
                        className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                        required
                    />
                    <div className="flex flex-row justify-center items-center w-full gap-8">
                        <input type="text" placeholder="% Papel" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={papel} onChange={(e) => setPapel(e.target.value)} />
                        <input type="text" placeholder="% Plastico" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={plastico} onChange={(e) => setPlastico(e.target.value)} />
                        <input type="text" placeholder="% Orgânico" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={organico} onChange={(e) => setOrganico(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="flex items-center justify-center bg-primary px-8 py-2 rounded-lg">{btnText}</button>
            </form>

            <div className="w-full p-2 bg-white rounded-lg">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
}