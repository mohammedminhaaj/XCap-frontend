import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ChangeEmailForm from '../components/forms/ChangeEmailForm';
import ChangePasswordForm from '../components/forms/ChangePasswordForm';
import { useAuthContext } from '../store/AuthProvider';
import { AnimatePresence } from 'framer-motion';
import BreadCrumbs from '../components/Breadcrumb';
import DashboardLayout from '../layout/DashboardLayout';

export type ProfileScreenProps = {
	setIsPasswordScreen: Dispatch<SetStateAction<boolean>>;
};

const Profile: React.FC = () => {
	const [isPasswordScreen, setIsPasswordScreen] = useState<boolean>(false);

	const { state } = useLocation();

	const { userToken } = useAuthContext(); // Get user token
	useEffect(() => {
		document.title = 'Profile | XCap';
	}, []); // Set page title
	if (!userToken) {
		// Redirect if the user is not available
		return <Navigate to='/login' replace={true} />;
	}

	return (
		<DashboardLayout>
			<BreadCrumbs currentPage='Profile' />
			<h2 className='text-4xl md:text-5xl font-bold text-emerald-500'>
				Hello,
			</h2>
			<h3 className='text-lg md:text-2xl font-light text-gray-500'>
				{state.username}
			</h3>
			<h3 className='font-bold'>Profile Details</h3>
			<AnimatePresence>
				{isPasswordScreen ? (
					<ChangePasswordForm
						setIsPasswordScreen={setIsPasswordScreen}
					/>
				) : (
					<ChangeEmailForm
						setIsPasswordScreen={setIsPasswordScreen}
						currentEmail={state.email}
					/>
				)}
			</AnimatePresence>
		</DashboardLayout>
	);
};

export default Profile;
