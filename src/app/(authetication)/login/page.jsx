'use client'
import { useState } from "react"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <section className="flex items-center justify-center relative w-full shadow-lg isolate bg-[#fefefd]">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                <div className='flex relative lg:w-1/2 h-screen bg-[#019BD6]'>
                    {/* <img src='/images/background2.jpg' width={900} height={800} className='block z-30' /> */}
                </div>
                <div className="flex flex-col text-start gap-10 w-full lg:w-1/2 py-10 px-14 lg:px-20">
                    <h1 className="text-md lg:text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Faça seu login
                    </h1>

                    <div className="flex items-center justify-start gap-x-8 px-20">
                        <form className="flex flex-col items-center justify-center w-full gap-6 px-8">
                            <input type="text" placeholder="Usuário" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={username} onChange={e => setUsername(e.target.value)} />
                            <input type="email" placeholder="Senha" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={password} onChange={e => setPassword(e.target.value)} />
                            <button type="submit" className=" w-full bg-[#019BD6] hover:bg-blue-400 rounded-lg p-3 text-lg font-bold text-white">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}