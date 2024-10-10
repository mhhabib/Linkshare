import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	Navigate,
} from 'react-router-dom';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import ProfilePreview from './pages/ProfilePreview.js';
import Registration from './authentication/Registration.js';
import Login from './authentication/Login.js';
import LinkSharePage from './pages/LinkSharePage.js';
import { ViewProvider } from './components/ViewContext';

import { AuthProvider, useAuth } from './authentication/AuthContext';

function ProtectedRoute({ children }) {
	const { token } = useAuth();
	return token ? children : <Navigate to="/login" />;
}

function App() {
	const location = useLocation();

	return (
		<ViewProvider>
			<div className="min-h-screen h-full bg-gray-100">
				{location.pathname === '/' && (
					<div className="pt-5">
						<Header />
					</div>
				)}
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/share"
						element={
							<ProtectedRoute>
								<ProfilePreview />
							</ProtectedRoute>
						}
					/>
					<Route path="/register" element={<Registration />} />
					<Route path="/login" element={<Login />} />
					<Route path="/users/:username" element={<LinkSharePage />} />
				</Routes>
			</div>
		</ViewProvider>
	);
}

export default function AppWrapper() {
	return (
		<AuthProvider>
			<Router>
				<App />
			</Router>
		</AuthProvider>
	);
}
