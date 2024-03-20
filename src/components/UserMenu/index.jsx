'use client';
import { useContext, useState } from 'react';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

export default function UserMenu() {
    const [showUserMenu, setShowUserMenu] = useState(false);

    const { signOut, userData } = useAuth();



    console.log(showUserMenu);

    return (
        <div className='relative'>
            <article className='flex flex-row items-center gap-4' >
                <div className='flex flex-col items-end gap-1'>
                    <h1 className="text-base font-medium text-black">Bem vindo, {userData?.nome}!</h1>
                    <span className='text-sm text-black'>{userData?.email}</span>
                </div>
                <span onClick={() => setShowUserMenu(!showUserMenu)}>
                    <InitialsAvatar name={userData?.nome} />
                </span>
            </article>
            {showUserMenu ? <span className={`absolute -bottom-12 -right-4 text-lg hover:cursor-pointer hover:bg-slate-100 bg-white flex items-center justify-center rounded-xl px-6 py-2 text-black`} onClick={signOut}>Sair</span> : ''}
        </div>
    )
}