import { Link, User } from 'lucide-react';
import { useView } from './ViewContext';
import { useAuth } from '../authentication/AuthContext';
import linkIcon from '../images/link.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const { activeView, setActiveView } = useView();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<header className="w-[90%] mx-auto flex justify-between items-center p-4 bg-white rounded-xl">
			<div className="flex items-center">
				<img src={linkIcon} className="h-10 w-10 md:mr-2" alt="Devlinks logo" />
				<span className="text-xl font-bold hidden md:inline">Devlinks</span>
			</div>
			<nav className="flex space-x-4">
				<button
					className={`flex items-center justify-center p-2 md:px-4 md:py-2 rounded-lg ${
						activeView === 'links'
							? 'bg-violet-300 text-violet-800 font-semibold'
							: 'text-gray-600 hover:bg-gray-100'
					}`}
					onClick={() => setActiveView('links')}
				>
					<Link className="h-5 w-5" />
					<span className="hidden md:inline">Links</span>
				</button>
				<button
					className={`flex items-center justify-center p-2 md:px-4 md:py-2 rounded-lg ${
						activeView === 'profile'
							? 'bg-violet-300 text-violet-800 font-semibold'
							: 'text-gray-600 hover:bg-gray-100'
					}`}
					onClick={() => setActiveView('profile')}
				>
					<User className="h-5 w-5" />
					<span className="hidden md:inline">Profile Details</span>
				</button>
			</nav>
			<div className="flex space-x-4">
				<button
					className="p-2 md:px-4 md:py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50"
					onClick={(e) => navigate('/share')}
				>
					Preview
				</button>
				<button
					onClick={handleLogout}
					className="p-2 md:px-4 md:py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
				>
					Logout
				</button>
			</div>
		</header>
	);
};

export default Header;
