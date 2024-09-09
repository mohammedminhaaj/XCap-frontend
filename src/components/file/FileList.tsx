import { Loader2 } from 'lucide-react';
import { UserFiles } from '../../lib/types';
import StatusPill from '../StatusPill';
import { BASE_URL } from '../../lib/utils';

type FileListProps = {
	response: UserFiles | undefined;
	isLoading: boolean;
	isError: boolean;
};

const FileList: React.FC<FileListProps> = ({
	response,
	isLoading,
	isError,
}: FileListProps) => {
	if (isLoading) return <Loader2 className='animate-spin mx-auto' />;

	if (isError)
		return <p className='mx-auto'>Error occured while loading the data</p>;

	if (!response || !response.data.length)
		return <p className='mx-auto'>No data available</p>;

	return (
		<table className='table-auto border-separate border-spacing-y-5 w-full text-xs md:text-sm'>
			<thead className='text-left uppercase'>
				<tr className='text-emerald-500'>
					<th>File Name</th>
					<th>Uploaded At</th>
					<th>Processing Time</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody className='text-gray-500'>
				{response.data.map((item) => {
					const formattedDateTime = new Date(item.upload_time);
					const formattedDuration = parseFloat(item.duration!);
					return (
						<tr key={item.id}>
							<td>{item.file_name}</td>
							<td>{formattedDateTime.toLocaleString()}</td>
							<td>
								{!!formattedDuration
									? `${formattedDuration.toFixed(4)}s`
									: '-'}
							</td>
							<td>
								<StatusPill status={item.status} />
							</td>
							<td>
								{item.processed_file_path ? (
									<a
										className='px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-xl bg-emerald-900 transition-colors duration-300 hover:bg-emerald-950 text-xs md:text-sm text-white'
										type='button'
										href={`${BASE_URL}${item.processed_file_path}`}
										title='Download'
										download={true}>
										Download
									</a>
								) : (
									'-'
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default FileList;
