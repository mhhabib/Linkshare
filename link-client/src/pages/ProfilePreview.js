import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { platformColors } from '../utils/PlatformLink';
import { useAuth } from '../authentication/AuthContext';
import axios from 'axios';
import userAvatar from '../images/user.png';
import ToastNotifications, {
	showSuccessToast,
} from '../utils/ToastNotifications';

const ProfilePreview = () => {
	const navigate = useNavigate();
	const { token } = useAuth();
	const [userProfile, setUserProfile] = useState({ links: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	const handleLinkShare = () => {
		const shareLink = `http://localhost:3000/users/${userProfile.username}`;
		navigator.clipboard.writeText(shareLink);
		showSuccessToast(`Sharing link is copied: ${shareLink}`);
	};
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
		<>
			<div className="min-h-screen flex flex-col bg-white relative">
				<header className="w-[90%] mx-auto p-4 flex justify-between items-center z-10">
					<button
						className="bg-white text-purple-600 px-4 py-2 rounded-full flex items-center"
						onClick={(e) => navigate('/')}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Editor
					</button>
					<button
						className="bg-purple-700 text-white px-4 py-2 rounded-full"
						onClick={handleLinkShare}
					>
						Share Link
					</button>
				</header>
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
			<ToastNotifications />
		</>
	);
};

export default ProfilePreview;
