import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../store/AuthProvider';
import { getUserDetails } from '../../lib/auth_helper';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

const ProfileDetails: React.FC = () => {
	const { userToken } = useAuthContext();

	// Fetching user details
	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['user-details'],
		queryFn: () => getUserDetails(userToken!),
		retry: 1,
		staleTime: Infinity, // Setting stale time to infinity to retain the cache
	});

	if (isLoading) return <Loader2 className='animate-spin mx-auto' />;
	if (isError || !response)
		return (
			<p className='text-xs text-red-500'>
				Failed to load profile information
			</p>
		);

	return (
		<section className=''>
			<div className='space-y-1'>
				<h2 className='font-bold text-2xl text-emerald-500'>Hello,</h2>
				<h3 className='font-light'>{response.data.username}</h3>
				<Link
					to={'/dashboard/profile'}
					state={{
						email: response.data.email,
						username: response.data.username,
					}}
					className='text-xs text-emerald-500 underline flex justify-start items-center transition-all duration-300 gap-1 hover:gap-2'>
					Profile
					<ArrowRight className='size-3' />
				</Link>
			</div>
		</section>
	);
};

export default ProfileDetails;
