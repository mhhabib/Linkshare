import React from 'react';
import mobileMockup from '../images/mobile.png';
import userAvatar from '../images/user.png';
import { useUserProfile } from '../authentication/UserProfileContext';
import { platformColors } from '../utils/PlatformLink';

const MobilePreview = () => {
	const { userProfile, loading, error } = useUserProfile();
	console.log("Preview: ", userProfile)
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
		<div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-4 bg-white rounded-lg">
			<div className="relative w-full h-full">
				<img
					src={mobileMockup}
					alt="Mobile mockup"
					className="absolute inset-0 w-full h-full object-contain"
				/>
				<div className="absolute inset-0 flex flex-col justify-center items-center">
					<img
						src={
							userProfile.profilePicture
								? `http://localhost:8000/${userProfile.profilePicture}`
								: userAvatar
						}
						alt="Profile"
						className="w-16 h-16 object-cover border-2 border-violet-400 rounded-full"
					/>
					<p className="text-black text-center text-sm mt-2">
						{userProfile.firstName} {userProfile.lastName}
					</p>
					<p className="text-black text-center text-sm mb-3">
						{userProfile.email}
					</p>
					<div className="space-y-2 w-[160px] h-[200px] overflow-y-auto">
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

export default MobilePreview;
