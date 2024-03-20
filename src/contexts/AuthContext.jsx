'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated (you can use localStorage, cookies, etc.)
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        } else {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        console.log('userData', userData);
    }, [userData]);

    const signIn = (userData) => {
        // Set user data in localStorage after successful authentication
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        router.push('/dashboard');
    };

    const signOut = () => {
        // Remove user data from localStorage on sign out
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, userData, setUserData, signIn, signOut, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);