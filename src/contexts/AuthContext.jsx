'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [editUserPopUp, setEditUserPopUp] = useState(false);
    const [userConsumptionPopUp, setUserConsumptionPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated (you can use localStorage, cookies, etc.)
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
            setUserData(JSON.parse(user));
        } else {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        getProjects();
    }, [userData]);

    useEffect(() => {
        setSelectedProject(projectList[0]?.nome);
    }, [projectList]);

    const getProjects = async () => {
        try {
            const response = await fetch(`http://191.252.38.35:8080/api/projetos/listar?login=${userData.login}&senha=${userData.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();
                setProjectList(data);
                setSelectedProject(data[0]?.nome);

            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const signIn = async (userData) => {
        try {
            const response = await fetch('https://calculadora.institutoterrazul.org/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();
                setBtnText('logado com sucesso!')
                localStorage.setItem('user', JSON.stringify(data));
                setUserData(data);
                router.push('/dashboard');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };



    const signOut = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, userData, setUserData, signIn, signOut, isAuthenticated, setIsAuthenticated, projectList, setProjectList, selectedProject, setSelectedProject, editUserPopUp, setEditUserPopUp, userConsumptionPopUp, setUserConsumptionPopUp, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);