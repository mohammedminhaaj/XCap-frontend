import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../store/AuthProvider';
import { useEffect } from 'react';
import AuthLayout from '../layout/AuthLayout';
import LoginForm from '../components/forms/LoginForm';

const Login: React.FC = () => {
	const { userToken } = useAuthContext(); // Get current user auth token
	useEffect(() => {
		document.title = 'Login | XCap';
	}, []); // Set page title

	if (userToken) {
		// Navigate to dashboard if the user token is already present
		return <Navigate to='/dashboard' replace={true} />;
	}

	return (
		<AuthLayout>
			<h1 className='text-center text-3xl font-extrabold text-secondary'>
				Login
			</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please login using your credentials
			</h2>
			<LoginForm />
		</AuthLayout>
	);
};

export default Login;
