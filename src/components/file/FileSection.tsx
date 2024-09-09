import { Link } from 'react-router-dom';
import FileList from './FileList';
import FileUploadButton from './FileUploadButton';
import { useAuthContext } from '../../store/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getUserFiles } from '../../lib/file_helper';
import { ArrowRight } from 'lucide-react';

const FileSection: React.FC = () => {
	const { userToken } = useAuthContext();

	// Get User files
	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['userFiles'],
		queryFn: () => getUserFiles(userToken!, '10'),
		retry: 1,
		refetchInterval: 5000,
		refetchIntervalInBackground: true,
	});
	return (
		<>
			<header className='flex justify-between items-center'>
				<h2 className='text-xl md:text-3xl font-bold text-emerald-500'>
					Recents
				</h2>
				<Link
					to={'/dashboard/all-files'}
					className='text-sm md:text-base flex justify-center items-center transition-all duration-300 gap-2 hover:gap-4'>
					View All
					<ArrowRight className='size-4' />
				</Link>
			</header>
			<section className='flex justify-end'>
				<FileUploadButton />
			</section>
			<FileList
				response={response}
				isLoading={isLoading}
				isError={isError}
			/>
		</>
	);
};

export default FileSection;
