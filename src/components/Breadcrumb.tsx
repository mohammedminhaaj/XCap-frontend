import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BreadCrumbs: React.FC<{ currentPage: string }> = ({
	currentPage,
}: {
	currentPage: string;
}) => {
	/*
		Component to display breadcrumb navigation
	*/
	return (
		<nav className='flex gap-3 flex-wrap items-center justify-start w-full text-sm md:text-lg'>
			<Link to={'/dashboard'} className='text-gray-500'>
				Dashboard
			</Link>
			<ChevronRight className='size-5 text-gray-500' />
			<h3 className='text-bold text-emerald-500'>{currentPage}</h3>
		</nav>
	);
};

export default BreadCrumbs;
