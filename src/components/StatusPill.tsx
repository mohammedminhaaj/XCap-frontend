const StatusColor: Record<string, string> = {
	UPLOADED: 'bg-blue-500',
	PROCESSING: 'bg-amber-500',
	COMPLETED: 'bg-green-500',
	FAILED: 'bg-red-500',
};

const StatusPill: React.FC<{ status: string }> = ({
	status,
}: {
	status: string;
}) => {
	return (
		<span className={`${StatusColor[status]} text-white px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-xl text-xs md:text-sm`}>
			{status}
		</span>
	);
};

export default StatusPill;
