import { Search } from 'lucide-react';
import { useId } from 'react';

const SearchBar: React.FC = () => {
	/*
		Component to display search bar
	*/
	const searchId = useId();
	return (
		<form className='relative w-full md:w-fit'>
			<label htmlFor={searchId} className='sr-only'>
				Search
			</label>
			<input
				id={searchId}
				name='search'
				type='text'
				title='search'
				placeholder='Search here...'
				className='w-full md:w-fit border rounded-xl focus:ring-emerald-500 outline-emerald-500 px-2 pr-10 py-1 placeholder:text-sm'
			/>
			<button
				className='absolute inset-y-0 right-0 bg-emerald-500 rounded-xl px-2 text-white transition-colors duration-300 hover:bg-emerald-600'
				type='submit'
				title='Search'>
				<Search className='size-5' />
			</button>
		</form>
	);
};

export default SearchBar;
