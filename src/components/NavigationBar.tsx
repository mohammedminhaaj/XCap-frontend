import { Menu } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import LogoutButton from './dashboard/LogoutButton';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './dashboard/Sidebar';

const NavigationBar: React.FC = () => {
	const [showNav, setShowNav] = useState<boolean>(false);
	const toggleNav = () => {
		setShowNav((prev) => !prev);
	};
	return (
		<>
			<header className='fixed w-full top-0 rounded shadow-xl p-5 flex justify-between items-center z-30 bg-opacity-15 backdrop-blur-sm bg-white'>
				<div className='flex gap-3'>
					<button
						onClick={toggleNav}
						type='button'
						title='Toggle Sidebar'
						className='rounded-lg'>
						<Menu className='size-5 stroke-1' />
					</button>
					<Logo />
				</div>
				<LogoutButton />
			</header>
			<AnimatePresence>
				{showNav && <Sidebar onClose={toggleNav} />}
			</AnimatePresence>
		</>
	);
};

export default NavigationBar;
