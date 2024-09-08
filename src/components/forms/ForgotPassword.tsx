import { SubmitHandler, useForm } from 'react-hook-form';
import useToast from '../../hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../lib/auth_helper';
import { MessageType } from '../../store/MessageProvider';
import { Link } from 'react-router-dom';
import AuthButton from '../AuthButton';
import { ArrowLeft } from 'lucide-react';

// Form fields
export type ForgotPasswordInput = {
	username: string;
	email: string;
};

type ForgotPasswordFormProps = {
	setPasswordSent: () => void;
};

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
	setPasswordSent,
}: ForgotPasswordFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ForgotPasswordInput>();

	// Custom hook to display toast messages
	const toast = useToast();

	const { mutate, isPending } = useMutation({
		// Helper function to handle form submission
		mutationFn: forgotPassword,
		onSuccess: async (response) => {
			const payload = await response.json();
			if (response.status >= 400) {
				// Check if the response has any errors
				if (payload.data) {
					// Display all the field errors
					for (const field of Object.keys(payload.data)) {
						toast(
							`${field}: ${payload.data[field][0]}`,
							MessageType.ERROR
						);
					}
				} else {
					// Display general errors
					toast(payload.message || payload.detail, MessageType.ERROR);
				}
				// Reset the password field on error
				reset({ email: '' });
			} else {
				// Show success message
				toast(payload.message);

				// Change state
				setPasswordSent();
			}
		},
		onError: (error) => {
			// Handle errors during the form submission
			toast(error.message, MessageType.ERROR);
			reset({ email: '' });
		},
	});

	// Helper function to handle form submission
	const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
		mutate({ username: data.username, email: data.email });
	};

	return (
		<form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
			<div className='relative'>
				<input
					id='username-field'
					required
					{...register('username', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message:
								'Username should contain atleast 6 characters',
						},
					})} // Adding validation
					className={`form-input peer ${errors.username && 'error'}`}
					title='Username'
					type='text'
				/>
				<label
					className={`form-label ${
						errors.username && 'text-red-500'
					}`}
					htmlFor='username-field'>
					Username
				</label>
			</div>
			<div className='relative'>
				<input
					id='email-field'
					required
					{...register('email', {
						required: 'This field is required',
						pattern: {
							value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
							message: 'Please enter a valid email',
						},
					})} // Adding validation
					className={`form-input peer ${errors.email && 'error'}`}
					title='Email'
					type='email'
				/>
				<label
					className={`form-label ${errors.email && 'text-red-500'}`}
					htmlFor='email-field'>
					Email
				</label>
			</div>
			{errors.email && (
				// Displaying field errors
				<p className='text-xs text-red-500'>{errors.email.message}</p>
			)}
			<AuthButton isPending={isPending}>Continue</AuthButton>
			<Link
				to={'/Login'}
				className='flex justify-center items-center gap-2 transition-all duration-300 hover:gap-4'>
				<ArrowLeft />
				Go Back
			</Link>
		</form>
	);
};

export default ForgotPasswordForm;
