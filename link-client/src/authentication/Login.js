import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../authentication/AuthContext'; // Ensure the import path is correct
import ToastNotifications, {
	showSuccessToast,
	showErrorToast,
} from '../utils/ToastNotifications';

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth(); 
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:8000/api/auth/login',
				{
					username: username,
					password: password,
				}
			);
			
			if (response.status === 200) {
				showSuccessToast('Succesfully logged in!');
				login(response.data.token); 
				navigate('/'); 
			}
		} catch (error) {
			showErrorToast('Invalid username or password. Please try again.');
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-3/5 bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
				
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
						Login
					</button>
					<div className="text-center py-2">
						<p>
							Don't have an account?{' '}
							<span
								className="text-blue-400 font-semibold cursor-pointer"
								onClick={() => navigate('/register')}
							>
								Register now
							</span>{' '}
						</p>
					</div>
				</form>
				<ToastNotifications/>
			</div>
		</div>
	);
};

export default Login;
