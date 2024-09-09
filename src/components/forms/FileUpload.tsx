import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import Modal from '../Modal';
import { Loader2, XCircle } from 'lucide-react';
import { useAuthContext } from '../../store/AuthProvider';
import useToast from '../../hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFiles } from '../../lib/file_helper';
import { MessageType } from '../../store/MessageProvider';

type FileUploadProps = {
	toggleModal: () => void;
};

const FileUpload: React.FC<FileUploadProps> = ({
	toggleModal,
}: FileUploadProps) => {
	const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const { userToken } = useAuthContext();

	// Custom hook to display toast messages
	const toast = useToast();

	// Creating a query client to invalidate cache
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		// Helper function to handle form submission
		mutationFn: uploadFiles,
		onSuccess: async (response) => {
			toast(response.message);
			setFilesToUpload([]);
			toggleModal();
			// Invalidate user stocks cache
			queryClient.invalidateQueries({
				queryKey: ['userFiles'],
			});

			queryClient.invalidateQueries({
				queryKey: ['userFilesAll'],
			});
		},
		onError: (error) => {
			// Handle errors during the form submission
			toast(error.message || 'Something went wrong', MessageType.ERROR);
		},
	});

	const onUpload = () => {
		mutate({
			files: filesToUpload,
			token: userToken!,
		});
	};

	const handleFiles = (files: FileList) => {
		const newFiles: File[] = [];
		for (let i = 0; i < files.length; i++) {
			if (files[i].type === 'text/xml') {
				const fileExists = filesToUpload.some(
					(item) =>
						item.name === files[i].name &&
						item.size === files[i].size
				);

				if (!fileExists) {
					newFiles.push(files[i]);
				}
			}
		}
		if (newFiles.length) {
			setFilesToUpload((prev) => [...prev, ...newFiles]);
		}
	};

	const onFilesSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;
		handleFiles(files);
	};

	const onFilesDelete = (fileName: string, fileSize: number) => {
		setFilesToUpload((prev) => [
			...prev.filter(
				(item) => item.name !== fileName && item.size !== fileSize
			),
		]);
	};

	const onDragDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const files = event.dataTransfer.files;
		handleFiles(files);
	};

	const onDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	};

	return (
		<Modal title='Upload XML' onClose={toggleModal}>
			<div
				role='button'
				onClick={() => {
					inputRef.current?.click();
				}}
				onDragOver={onDragOver}
				onDrop={onDragDrop}
				className='border-dashed border-2 border-gray-500 rounded-xl p-4 h-40 flex justify-center items-center cursor-pointer'>
				Drag or Click to Upload
			</div>
			<input
				onChange={onFilesSelect}
				ref={inputRef}
				type='file'
				accept='.xml'
				className='sr-only'
				multiple
			/>
			{!!filesToUpload.length && (
				<section className='flex flex-wrap gap-5 mt-5'>
					{filesToUpload.map((item) => (
						<div
							key={`${item.name}-${item.size}`}
							className='max-w-20 flex flex-col items-center'>
							<div className='size-20 bg-gray-300 rounded-xl flex items-center justify-center'>
								<button
									title='Remove File'
									type='button'
									onClick={() =>
										onFilesDelete(item.name, item.size)
									}>
									<XCircle className='text-gray-700' />
								</button>
							</div>
							<p
								title={item.name}
								className='text-xs text-gray-500 truncate max-w-full'>
								{item.name}
							</p>
						</div>
					))}
				</section>
			)}

			<section className='flex justify-end mt-5'>
				<button
					onClick={onUpload}
					disabled={!filesToUpload.length || isPending}
					className='primary-button'>
					{isPending ? (
						<Loader2 className='animate-spin mx-auto' />
					) : (
						'Upload'
					)}
				</button>
			</section>
		</Modal>
	);
};

export default FileUpload;
