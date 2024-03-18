'use client';
import { useContext, useState } from 'react';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

export default function UserMenu() {
    const [showUserMenu, setShowUserMenu] = useState(false);

    const { signOut } = useAuth();



    console.log(showUserMenu);

    return (
        <div className='relative'>
            <article className='flex flex-row items-center gap-4' >
                <h1 className="text-lg font-medium text-black">Bem vindo, Terrazul!</h1>
                <span onClick={() => setShowUserMenu(!showUserMenu)}>
                    <InitialsAvatar name="Terrazul" />
                </span>
            </article>
            {showUserMenu ? <span className={`absolute -bottom-12 -right-4 text-lg hover:cursor-pointer hover:bg-slate-100 bg-white flex items-center justify-center rounded-xl px-6 py-2 text-black`} onClick={signOut}>Sair</span> : ''}
        </div>
    )
}