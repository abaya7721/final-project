import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as apiLogin } from '../utilities/apiUtilities';

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('key');
        console.log('Checking for existing token:', token ? 'Token exists' : 'No token found');
        
        if (token) {
            try {
                const claims = jwtDecode(token);
                console.log('Token claims:', claims);
                
                const userData = {
                    username: claims.sub,
                    role: Array.isArray(claims.role) ? claims.role[0].authority : claims.role,
                    authenticated: true
                };
                console.log('Setting user data from token:', userData);
                setUser(userData);
            } catch (err) {
                console.error('Invalid token:', err);
                localStorage.removeItem('key');
                localStorage.removeItem('role');
                localStorage.removeItem('username');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);
            console.log('Attempting login for:', username);

            const data = await apiLogin({ username, password });
            console.log('Login response received:', data ? 'Success' : 'Failed');

            if (!data || !data.token) {
                throw new Error('No token received from server');
            }

            const claims = jwtDecode(data.token);
            console.log('Token claims:', claims);

            // Store token and user info
            localStorage.setItem('key', data.token);
            console.log('Token stored in localStorage');

            // Store role and username
            const role = Array.isArray(claims.role) ? claims.role[0].authority : claims.role;
            localStorage.setItem('role', role);
            localStorage.setItem('username', claims.sub);
            console.log('Role and username stored:', { role, username: claims.sub });

            // Update user state
            const userData = {
                username: claims.sub,
                role: role,
                authenticated: true
            };
            console.log('Setting user state:', userData);
            setUser(userData);

            return true;
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                setError(err.response.data?.message || 'Authentication failed');
            } else {
                setError(err.message || 'Network error. Please try again.');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        console.log('Logging out user');
        localStorage.removeItem('key');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        setUser(null);
        setError(null);
        console.log('User logged out, storage cleared');
    };

    const isAuthenticated = () => {
        const authenticated = user !== null && user.authenticated;
        console.log('Checking authentication:', { user, isAuthenticated: authenticated });
        return authenticated;
    };

    const isAdmin = () => {
        const isAdminUser = user !== null && user.role === 'ROLE_ADMIN';
        console.log('Checking admin status:', { user, isAdmin: isAdminUser });
        return isAdminUser;
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
        isAdmin
    };

    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    );
};

// Custom hook for using the UserAuthContext
export const useAuth = () => {
    const context = useContext(UserAuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a UserAuthProvider');
    }
    return context;
}; 