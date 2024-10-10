import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make API requests

const Registration = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(''); // For displaying errors

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:8000/api/auth/register',
				{
					username: username,
					password: password,
				}
			);
			console.log('Registration successful:', response.data);
			// Navigate to the login page after successful registration
			navigate('/login');
		} catch (error) {
			console.error(
				'Registration failed:',
				error.response?.data || error.message
			);
			setErrorMessage('Something went wrong! Please try again.');
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-3/5 bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Register</h2>
				{errorMessage && (
					<p className="text-center text-red-400 font-sm">{errorMessage}</p>
				)}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
							required
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
					>
						Register
					</button>
					<div className="text-center py-2">
						<p>
							Already have an account?{' '}
							<span
								className="text-blue-400 font-semibold cursor-pointer"
								onClick={() => navigate('/login')}
							>
								Log In
							</span>{' '}
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Registration;
