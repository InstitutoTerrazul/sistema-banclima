// 'use client'
// import { useAuth } from "@/contexts/AuthContext";
// import { useRouter } from 'next/navigation';
// import { useEffect } from "react";

// export default function Home() {
//   const  isAuthenticated  = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push('/dashboard');
//     } else {
//       router.push('/login');
//     }
//   }, [isAuthenticated, router]);

//   return null;
// }


'use client'
import Image from "next/image"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [btnText, setBtnText] = useState('Entrar')
  const router = useRouter();

  const { setUserData, setIsLoading } = useAuth();



  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();


  const sendLead = async () => {
    setBtnText('Entrando...')

    const data = {
      login: username,
      senha: password,
    }

    try {
      const response = await fetch('http://191.252.38.35:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const data = await response.json();
        setBtnText('logado com sucesso!')
        toast.success('Login efetuado com sucesso!');
        setIsLoading(true)
        localStorage.setItem('user', JSON.stringify(data));
        setUserData(data);
        router.push('/dashboard');
      } else {
        console.error('Failed to create post');
        toast.error('Erro ao efetuar login');
        setBtnText('Erro ao efetuar login');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }

    setTimeout(() => {
      setBtnText('Entrar')
    }, 3000)
  }

  return (
    <section className="flex items-center justify-center relative w-full shadow-lg isolate bg-[#fefefd]">
      <ToastContainer theme="colored"/>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        <div className='flex flex-col items-end justify-center py-40 px-10 relative lg:w-[55%] h-screen bg-[url(/v2/login-bg.jpg)] bg-cover bg-no-repeat after:absolute after:bg-primary/[.10] after:top-0 after:bottom-0 after:right-0 after:left-0 after:z-20'>
          {/* <span className="text-3xl font-normal text-white text-end z-40">Bem vindo ao <span className="font-bold">sistema Banclima</span> </span>
          <span className="text-xl font-normal text-white text-end z-40">Entre e acesse as informações sobre o total de emissoes evitadas.</span> */}
          <img src="/v2/assets/banclima.png" alt="" className="z-30 w-[650px] h-[200px]"/>
        </div>
        <div className=" flex-1 flex flex-col items-center text-start gap-10 w-full py-10 px-10 lg:px-20">
          <img
            className="w-[180px] h-[72px]"
            src="/v2/assets/logo.png"
            alt=""
          />
          <h1 className="text-md lg:text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
            Faça seu login
          </h1>

          <div className="flex flex-col items-center justify-start gap-x-8 w-full lg:px-10 2xl:px-20">
            <form onSubmit={handleSubmit(sendLead)} className="flex flex-col items-center justify-center w-full gap-6 2xl:px-8">
              <input type="text" placeholder="Usuário" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={username} onChange={e => setUsername(e.target.value)} />
              <input type="password" placeholder="Senha" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="submit" className=" w-full bg-[#019BD6] hover:bg-blue-400 rounded-lg p-3 text-lg font-bold text-white">{btnText}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}