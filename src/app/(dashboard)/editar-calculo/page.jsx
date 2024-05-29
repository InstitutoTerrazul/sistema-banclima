'use client'
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';

export default function EditarCalculo() {
    const [tableData, setTableData] = useState([]);
    const [energia, setEnergia] = useState('');
    const [btnText, setBtnText] = useState('Inserir');
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateFormatted, setDateFormatted] = useState('');
    const [mounth, setMounth] = useState('');
    const [year, setYear] = useState('');

    const { userData, setIsLoading } = useAuth();

    const { handleSubmit, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        searchValues()
        setIsLoading(false)
    }, [])

    const filterArray = (data) => {
        setTableData(data);
        console.log('dados:', data);
    }

    const searchValues = async () => {
        console.log('User data:', userData);

        try {
            const response = await fetch('http://191.252.38.35:8080/api/energiaEResiduos/listar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data searched:', data);
                filterArray(data);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const submitForm = async () => {
        setBtnText('Inserindo...');
        const formattedDate = `${mounth}/${year}`

        const dataEnergia = {
            data: formattedDate,
            energia
        }

        try {
            const response = await fetch(`http://191.252.38.35:8080/api/energiaEResiduos/salvar?login=${userData.login}&senha=${userData.senha}`, {
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

        setTimeout(() => {
            setBtnText('Inserir');
            setEnergia('');
            setSelectedDate('')
            searchValues()
        }, 2000);

    }

    const columns = [
        {
            name: 'Energia',
            selector: row => row.energia,
        },
        {
            name: 'Mês/Ano',
            selector: row => row.data,
        },
    ];

    const data = tableData?.map(row => ({
        data: row.data,
        energia: row.energia
    }));

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

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 text-start">Editar Fatores de Emissão</h1>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-start gap-4 bg-white rounded-xl p-10">
                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="energia" className="text-black">Energia:</label>
                    <input type="text" placeholder="Energia" name="energia" id="energia" className="bg-white w-32 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={energia} onChange={(e) => setEnergia(e.target.value)} />
                </div>
                <div className="flex flex-row items-center gap-9">
                    <label htmlFor="data" className="text-black">Data:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MM/yyyy"
                        maxDate={new Date()}
                        placeholderText="Data"
                        locale={ptBR}
                        className="bg-white w-32 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black"
                        required
                    />
                </div>
                <div className="flex justify-end w-full">
                    <button type="submit" className="bg-primary px-8 py-2 rounded-lg">{btnText}</button>
                </div>
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