import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Upload } from 'lucide-react';
import FileUpload from '../forms/FileUpload';

const FileUploadButton: React.FC = () => {
	const [showUpload, setShowUpload] = useState<boolean>(false);

	const toggleModal = () => {
		setShowUpload((prev) => !prev);
	};

	return (
		<>
			<button className='primary-button' onClick={toggleModal}>
				<Upload className='size-4' />
				<p className='hidden md:block'>Upload</p>
			</button>
			<AnimatePresence>
				{showUpload && <FileUpload toggleModal={toggleModal} />}
			</AnimatePresence>
		</>
	);
};

export default FileUploadButton;
