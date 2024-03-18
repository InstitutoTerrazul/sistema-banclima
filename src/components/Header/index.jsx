'use client';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import UserMenu from '../UserMenu';


export default function Header() {
    return (
        <div className="w-full h-20 bg-background flex flex-col justify-center items-end px-20">
            <UserMenu />
        </div>
    )
}