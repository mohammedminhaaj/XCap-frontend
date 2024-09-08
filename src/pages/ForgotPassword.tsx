import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../store/AuthProvider';
import { useEffect, useState } from 'react';
import AuthLayout from '../layout/AuthLayout';

import ForgotPasswordForm from '../components/forms/ForgotPassword';
import { ArrowLeft, CheckCircle2Icon } from 'lucide-react';

const PasswordSent: React.FC = () => {
	return (
		<>
			<h2 className='text-2xl font-extrabold text-center'>Email Sent!</h2>
			<CheckCircle2Icon className='size-20 mx-auto text-emerald-500' />
			<h3 className='text-sm font-extralight text-center'>
				If you already have an account with us, you will receive an
				email containing temporary password. You can use this password
				to log in to your account.
			</h3>

			<Link to={'/login'} className='primary-button'>
				<ArrowLeft />
				Login
			</Link>
		</>
	);
};

const ForgotPassword: React.FC = () => {
	const { userToken } = useAuthContext(); // Get current user auth token
	const [passwordSent, setPasswordSent] = useState<boolean>(false);
	useEffect(() => {
		document.title = 'Forgot Password | XCap';
	}, []); // Set page title

	if (userToken) {
		// Navigate to dashboard if the user token is already present
		return <Navigate to='/dashboard' replace={true} />;
	}

	return (
		<AuthLayout>
			{passwordSent ? (
				<PasswordSent />
			) : (
				<>
					<h1 className='text-center text-3xl font-extrabold text-secondary'>
						Forgot Password
					</h1>
					<h2 className='text-center text-sm font-extralight'>
						Please enter your email to continue
					</h2>
					<ForgotPasswordForm
						setPasswordSent={() => setPasswordSent(true)}
					/>
				</>
			)}
		</AuthLayout>
	);
};

export default ForgotPassword;
