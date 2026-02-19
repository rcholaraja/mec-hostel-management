import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount
        const savedUser = authService.getCurrentUser();
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = (authData) => {
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', JSON.stringify({
            username: authData.username,
            role: authData.role,
            studentId: authData.studentId,
        }));
        setUser({
            username: authData.username,
            role: authData.role,
            studentId: authData.studentId,
        });
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const isAuthenticated = !!user;
    const isStudent = user?.role === 'STUDENT';
    const isWarden = user?.role === 'WARDEN';

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isStudent, isWarden, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
