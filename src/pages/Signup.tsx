import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../store/AuthProvider';
import { useEffect } from 'react';
import AuthLayout from '../layout/AuthLayout';
import SignupForm from '../components/forms/SignupForm';

const Signup: React.FC = () => {
	const { userToken } = useAuthContext(); // Get current user auth token
	useEffect(() => {
		document.title = 'Signup | XCap';
	}, []); // Set page title

	if (userToken) {
		// Navigate to dashboard if the user token is already present
		return <Navigate to='/dashboard' replace={true} />;
	}

	return (
		<AuthLayout>
			<h1 className='text-center text-3xl font-extrabold text-secondary'>
				Signup
			</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please fill in your details to create a new account
			</h2>
			<SignupForm />
		</AuthLayout>
	);
};

export default Signup;
