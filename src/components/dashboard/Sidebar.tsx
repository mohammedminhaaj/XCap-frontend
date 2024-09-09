import { motion } from 'framer-motion';
import { Home, X } from 'lucide-react';

import ProfileDetails from './ProfileDetails';
import { createPortal } from 'react-dom';

type SidebarProps = {
	onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }: SidebarProps) => {
	return createPortal(
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className='fixed top-0 z-40 w-full h-full backdrop-blur-sm'
				onClick={onClose}></motion.div>
			<motion.nav
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -100 }}
				transition={{ bounce: 0 }}
				className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 fixed top-0 h-full z-50 bg-white p-5 space-y-5 shadow-xl'>
				<header className='flex justify-between items-center'>
					<ProfileDetails />
					<button type='button' title='Close Modal' onClick={onClose}>
						<X className='stroke-1'/>
					</button>
				</header>

				<section className=''>
					<h3 className='rounded-xl bg-emerald-500 text-white p-3 font-bold inline-flex gap-2 w-full'>
						<Home />
						Home
					</h3>
				</section>
			</motion.nav>
		</>,
		document.getElementById('overlays')!
	);
};

export default Sidebar;
