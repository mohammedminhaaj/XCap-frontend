import { Loader2 } from 'lucide-react';

type AuthButtonProps = {
	isPending: boolean;
	children: React.ReactNode;
};

const AuthButton: React.FC<AuthButtonProps> = ({
	isPending,
	children,
}: AuthButtonProps) => {
	return (
		<button
			disabled={isPending} // Disable the button when loading
			title='submit'
			type='submit'
			className='primary-button'>
			{isPending ? (
				<Loader2 className='animate-spin mx-auto' />
			) : (
				children
			)}
		</button>
	);
};

export default AuthButton;
