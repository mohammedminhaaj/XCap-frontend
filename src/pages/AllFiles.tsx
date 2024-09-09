import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../store/AuthProvider';
import { useEffect } from 'react';
import BreadCrumbs from '../components/Breadcrumb';
import SearchBar from '../components/Searchbar';
import Pagination from '../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { getUserFiles } from '../lib/file_helper';
import FileList from '../components/file/FileList';
import DashboardLayout from '../layout/DashboardLayout';

const AllFiles: React.FC = () => {
	const { userToken } = useAuthContext(); // Get current auth token
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	useEffect(() => {
		document.title = 'Browse Files | XCap';
		if (!userToken)
			// Redirect the user if the token isn't available
			navigate('/login', { replace: true });
	}); // Set the title of the page

	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['userFilesAll', { page: searchParams.get('page') }],
		queryFn: () =>
			getUserFiles(
				userToken!,
				'10',
				searchParams.get('search'),
				searchParams.get('page')
			),
		retry: 1,
		refetchInterval: 5000,
		refetchIntervalInBackground: true,
	});

	return (
		<DashboardLayout>
			<BreadCrumbs currentPage='All Files' />
			<section className='space-y-5'>
				<SearchBar />
				<FileList
					response={response}
					isError={isError}
					isLoading={isLoading}
				/>
				{response && <Pagination totalRecords={response.count} />}
			</section>
		</DashboardLayout>
	);
};

export default AllFiles;
