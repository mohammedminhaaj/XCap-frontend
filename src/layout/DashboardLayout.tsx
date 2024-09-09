import NavigationBar from '../components/NavigationBar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<>
			<NavigationBar />
			<main className='p-5 md:p-10 mt-20 space-y-5 w-full'>{children}</main>
		</>
	);
};

export default DashboardLayout;
