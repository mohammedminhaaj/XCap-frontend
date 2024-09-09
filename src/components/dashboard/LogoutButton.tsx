import { LogOut } from 'lucide-react';
import { useAuthContext } from '../../store/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';

const LogoutButton: React.FC = () => {
	/*
		Component to handle logout functionality
	*/
	const { logout } = useAuthContext();
	const queryClient = useQueryClient();
	return (
		<button
			onClick={() => {
				logout();
				queryClient.invalidateQueries();
			}}
			type='button'
			title='Log out'
			className='primary-button text-xs md:text-sm'>
			<LogOut className='size-4' />
			<p className='hidden md:block'>Logout</p>
		</button>
	);
};

export default LogoutButton;
