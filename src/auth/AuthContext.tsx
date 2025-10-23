// auth/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { saveData, getData } from '../utils/storage';
import axios from 'axios';

type UserRole = 'admin' | 'user' | 'guest';

interface AuthContextType {
    isAuthenticated: boolean;
    role: UserRole;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const stored = getData<{ isAuthenticated: boolean; role: UserRole }>('auth');
        return stored ? stored.isAuthenticated : false;
    });
    const [role, setRole] = useState<UserRole>(() => {
        const stored = getData<{ isAuthenticated: boolean; role: UserRole }>('auth');
        return stored ? stored.role : 'guest';
    });

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const { token } = response.data;
            if (token) {
                saveData('jwt', token);
            }
            // Determine role based on username
            const role: UserRole = username.includes('admin') ? 'admin' : 'user';
            setIsAuthenticated(true);
            setRole(role);
            saveData('auth', { isAuthenticated: true, role });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole('guest');
        saveData('auth', { isAuthenticated: false, role: 'guest' });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
