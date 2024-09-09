import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Pagination: React.FC<{ totalRecords: number }> = ({
	totalRecords,
}: {
	totalRecords: number;
}) => {
	// Use search params hook from react router to get the current search parameters
	const [searchParams] = useSearchParams();
	// Use navigate hook to load new page data
	const navigate = useNavigate();
	// Get current pathname
	const location = useLocation();

	// Total number of records to display in each screen
	const numberOfPages: number = Math.ceil(totalRecords / 10);

	// Empty class to hold navigation buttons
	const buttons: JSX.Element[] = [];

	// Get current search params
	const params = new URLSearchParams(searchParams);

	// Helper function to get current active page
	const getActivePage: () => number = () => {
		for (let i: number = 1; i <= numberOfPages; i++) {
			// Check if search param has page
			const isPagePresent: boolean = searchParams.has('page');
			const isActive: boolean =
				// if the page param is not present, it is considered as a first page
				(i === 1 && !isPagePresent) ||
				// whether page param is present and is pointing to the current page in the loop
				(isPagePresent && searchParams.get('page') === i.toString());
			// return active page
			if (isActive) return i;
		}
		return -1;
	};

	// Get the active page
	const activePage: number = getActivePage();

	// Display only first two page numbers before the acitve page
	let startPage = activePage - 2;
	// Display only first two page numbers after the acitve page
	let endPage = activePage + 2;

	// Condition where the start page is less than 1
	if (startPage < 1) {
		endPage = Math.min(endPage + (1 - startPage), numberOfPages);
		startPage = 1;
	}
	// Condition where the end page is greater than total number of pages
	if (endPage > numberOfPages) {
		startPage = Math.max(1, startPage - (endPage - numberOfPages));
		endPage = numberOfPages;
	}

	for (let i: number = startPage; i <= endPage; i++) {
		// Loop to push all the button to display
		const isActive: boolean = i === activePage;
		buttons.push(
			<button
				type='button'
				disabled={isActive}
				title={`Go to page ${i}`}
				onClick={() => {
					handlePageClick(i);
				}}
				className={`px-4 py-1 rounded-xl text-sm transition-colors duration-300 ${
					isActive
						? 'bg-emerald-500 text-white'
						: 'hover:bg-emerald-500 hover:text-white'
				}`}
				key={`page-${i}`}>
				{i}
			</button>
		);
	}

	// Helper function to handle page click
	const handlePageClick = (page: number) => {
		page === 1
			? params.delete('page')
			: params.set('page', page.toString());
		// Navigating to respective page
		navigate(`${location.pathname}?${params.toString()}`, {
			replace: true,
		});
	};

	// Helper function to handle previous page click
	const handlePreviousClick = () => {
		activePage !== 1 &&
			(activePage - 1 === 1
				? params.delete('page')
				: params.set('page', (activePage - 1).toString()));
		navigate(`${location.pathname}?${params.toString()}`, {
			replace: true,
		});
	};

	// Helper function to handle next page click
	const handleNextClick = () => {
		activePage !== numberOfPages &&
			params.set('page', (activePage + 1).toString());
		navigate(`${location.pathname}?${params.toString()}`, {
			replace: true,
		});
	};

	return (
		<section className='py-5 flex justify-center items-center md:justify-end'>
			<div className='flex gap-2'>
				<button
					onClick={handlePreviousClick}
					type='button'
					title='Previous'
					disabled={activePage === startPage}
					className='text-emerald-500 p-1 rounded-xl transition-colors duration-300 hover:bg-emerald-500 hover:text-white disabled:text-gray-500 disabled:hover:bg-transparent'>
					<ChevronLeft size={20} />
				</button>
				{buttons}
				<button
					onClick={handleNextClick}
					disabled={activePage === endPage}
					type='button'
					title='Next'
					className='text-emerald-500 p-1 rounded-xl transition-colors duration-300 hover:bg-emerald-500 hover:text-white disabled:text-gray-500 disabled:hover:bg-transparent'>
					<ChevronRight size={20} />
				</button>
			</div>
		</section>
	);
};

export default Pagination;
