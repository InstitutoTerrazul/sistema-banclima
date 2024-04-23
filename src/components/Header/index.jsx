'use client';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import UserMenu from '../UserMenu';


export default function Header() {
    return (
        <div className="hidden w-full h-20 bg-transparent lg:flex flex-row justify-between items-center px-10">
            <span className='text-black font-bold text-xl'>Sistema de gestão - Bolsa de crédito de carbono comunitária</span> <UserMenu />
        </div>
    )
}