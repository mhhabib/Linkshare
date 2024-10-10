import React, { createContext, useState, useContext } from 'react';

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
	const [activeView, setActiveView] = useState('links');

	return (
		<ViewContext.Provider value={{ activeView, setActiveView }}>
			{children}
		</ViewContext.Provider>
	);
};

export const useView = () => useContext(ViewContext);
