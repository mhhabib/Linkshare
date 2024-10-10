import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../authentication/AuthContext';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
	const [userProfile, setUserProfile] = useState({ links: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { token } = useAuth();

	const fetchUserProfile = async () => {
		try {
			const response = await axios.get(
				'http://localhost:8000/api/users/profile',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUserProfile(response.data);
			setLoading(false);
		} catch (err) {
			setError('Failed to fetch user profile');
			setLoading(false);
		}
	};

	useEffect(() => {
		if (token) {
			fetchUserProfile();
		}
	}, [token]);

	const updateUserProfile = (newData) => {
		setUserProfile((prevProfile) => ({ ...prevProfile, ...newData }));
	};

	return (
		<UserProfileContext.Provider
			value={{
				userProfile,
				loading,
				error,
				updateUserProfile,
				fetchUserProfile,
			}}
		>
			{children}
		</UserProfileContext.Provider>
	);
};

export const useUserProfile = () => useContext(UserProfileContext);
