import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => localStorage.getItem('token')); 

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token); 
		} else {
			localStorage.removeItem('token'); 
		}
	}, [token]);

	const login = (token) => {
		setToken(token);
	};

	const logout = () => {
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
