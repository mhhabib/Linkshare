import React, { useEffect, useState } from 'react';
import { platformColors } from '../utils/PlatformLink';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import userAvatar from '../images/user.png';

const LinkSharePage = () => {
	const [userProfile, setUserProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { username } = useParams();
	const fetchUserProfile = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/users/${username}`
			);
			setUserProfile(response.data);
			setLoading(false);
		} catch (err) {
			setError('Failed to fetch user profile');
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	if (loading)
		return (
			<div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-4 bg-white rounded-lg">
				<h1 className="font-semibold uppercase text-green-500">Loading...</h1>
			</div>
		);
	if (error)
		return (
			<div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-4 bg-white rounded-lg">
				<h1 className="font-semibold uppercase text-red-500">{error}</h1>
			</div>
		);
	if (!userProfile) return null;

	return (
		<div className="min-h-screen flex flex-col bg-white relative">
			<div className="absolute top-0 left-0 right-0 h-1/2 bg-indigo-800 z-0 rounded-bl-3xl rounded-br-3xl" />

			<div className="flex-grow flex items-center justify-center px-4 z-10">
				<div className="bg-white rounded-3xl shadow-lg max-w-sm w-full p-8">
					<div className="flex flex-col items-center">
						<img
							src={
								userProfile.profilePicture
									? `http://localhost:8000/${userProfile.profilePicture}`
									: userAvatar
							}
							alt="Profile"
							className="w-24 h-24 rounded-full border-4 border-purple-600 mb-4"
						/>
						<h2 className="text-2xl font-bold mb-1">
							{userProfile.firstName} {userProfile.lastName}
						</h2>
						<p className="text-gray-500 mb-6">{userProfile.email}</p>
					</div>
					<div className="space-y-2 overflow-y-auto">
						{userProfile.links.map((link, index) => (
							<a
								key={index}
								href={link.originalUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={`block p-2 rounded-lg text-white ${
									platformColors[link.shortName] || 'bg-gray-400'
								}`}
							>
								{link.shortName}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LinkSharePage;
