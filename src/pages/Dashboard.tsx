import { useEffect } from 'react';
import { useAuthContext } from '../store/AuthProvider';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import FileSection from '../components/file/FileSection';

const Dashboard: React.FC = () => {
	const { userToken } = useAuthContext(); // Get user token
	useEffect(() => {
		document.title = 'Dashboard | XCap';
	}, []); // Set page title
	if (!userToken) {
		// Redirect if the user is not available
		return <Navigate to='/login' replace={true} />;
	}
	return (
		<DashboardLayout>
			<FileSection />
		</DashboardLayout>
	);
};

export default Dashboard;
