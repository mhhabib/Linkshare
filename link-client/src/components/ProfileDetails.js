import React, { useEffect, useState } from 'react';
import { Image } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../authentication/AuthContext';
import { useUserProfile } from '../authentication/UserProfileContext';

import ToastNotifications, {
	showSuccessToast,
	showErrorToast,
} from '../utils/ToastNotifications';

const ProfileDetails = () => {
	const { token } = useAuth();
	const [profileImage, setProfileImage] = useState(null);
	const { userProfile, updateUserProfile, fetchUserProfile } = useUserProfile();

	const [profileDetails, setProfileDetails] = useState({
		firstName: '',
		lastName: '',
		email: '',
		profilePicture: null,
	});

	useEffect(() => {
		if (userProfile) {
			setProfileDetails(userProfile);
			if (userProfile.profilePicture) {
				setProfileImage(`http://localhost:8000/${userProfile.profilePicture}`);
			}
		}
	}, [userProfile]);

	const handleChange = (e) => {
		setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setProfileDetails({ ...profileDetails, profilePicture: file });
			setProfileImage(imageUrl);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('firstName', profileDetails.firstName);
		formData.append('lastName', profileDetails.lastName);
		formData.append('email', profileDetails.email);
		if (profileDetails.profilePicture) {
			formData.append('profilePicture', profileDetails.profilePicture);
		}
		try {
			const response = await axios.put(
				'http://localhost:8000/api/auth/profile',
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			updateUserProfile(response.data);
			showSuccessToast('Profile updated successfully!');
			fetchUserProfile();
		} catch (error) {
			console.error('Error updating profile:', error);
			showErrorToast(error.response?.data?.error || 'Error saving the link');
		}
	};

	return (
		<div className="w-full lg:w-1/2 p-4 bg-white rounded-lg">
			<h1 className="text-3xl font-bold mb-4">Profile Details</h1>
			<p className="text-gray-600 mb-4">
				Add your details to create a personal touch to your profile.
			</p>

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Profile picture
					</label>
					<div className="flex items-center space-x-4">
						<div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
							{profileImage ? (
								<img
									src={profileImage}
									alt="Profile"
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<Image className="h-8 w-8 text-gray-400" />
								</div>
							)}
						</div>
						<label className="cursor-pointer bg-transparent text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50">
							Change Image
							<input
								type="file"
								className="hidden"
								onChange={handleImageChange}
								accept="image/*"
							/>
						</label>
					</div>
					<p className="text-xs text-gray-500 mt-1">
						Image must be below 1024x1024px. Use PNG, JPG, or BMP format.
					</p>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						First name*
					</label>
					<input
						type="text"
						name="firstName"
						value={profileDetails.firstName}
						onChange={handleChange}
						className="w-full p-2 border rounded-lg"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Last name*
					</label>
					<input
						type="text"
						name="lastName"
						value={profileDetails.lastName}
						onChange={handleChange}
						className="w-full p-2 border rounded-lg"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Email
					</label>
					<input
						type="email"
						name="email"
						value={profileDetails.email}
						onChange={handleChange}
						className="w-full p-2 border rounded-lg"
					/>
				</div>

				<button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
					Save
				</button>
			</form>
			<ToastNotifications />
		</div>
	);
};

export default ProfileDetails;
