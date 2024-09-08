import { SubmitHandler, useForm } from 'react-hook-form';
import useToast from '../../hooks/useToast';
import { useAuthContext } from '../../store/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../lib/auth_helper';
import { MessageType } from '../../store/MessageProvider';
import { Link, redirect } from 'react-router-dom';
import AuthButton from '../AuthButton';

// Form fields
export type LoginFormInput = {
	username: string;
	password: string;
};

const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginFormInput>();

	// Custom hook to display toast messages
	const toast = useToast();

	// Helper function to store the auth token after successful login
	const { login: loginLocally } = useAuthContext();

	const { mutate, isPending } = useMutation({
		// Helper function to handle form submission
		mutationFn: login,
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
				reset({ password: '' });
			} else {
				// Show success message
				toast(payload.message);
				// Store the auth token
				loginLocally(payload.data['auth_token']);
				// Redirect the user to dashboard
				redirect('/dashboard');
			}
		},
		onError: (error) => {
			// Handle errors during the form submission
			toast(error.message, MessageType.ERROR);
			reset({ password: '' });
		},
	});

	// Helper function to handle form submission
	const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
		mutate({ username: data.username, password: data.password });
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
			{errors.username && (
				// Displaying field errors
				<p className='text-xs text-red-500'>
					{errors.username.message}
				</p>
			)}
			<div className='relative'>
				<input
					id='password-field'
					required
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message:
								'Password should contain atleast 6 characters',
						},
					})} // Adding validation
					className={`form-input peer ${errors.password && 'error'}`}
					title='Password'
					type='password'
				/>
				<label
					htmlFor='password-field'
					className={`form-label  ${
						errors.password && 'text-red-500'
					}`}>
					Password
				</label>
			</div>
			{errors.password && (
				// Displaying field errors
				<p className='text-xs text-red-500'>
					{errors.password.message}
				</p>
			)}
			<Link
				to={'/signup'}
				className='text-xs text-center  hover:text-emerald-500 hover:underline'>
				Don't have an account?
			</Link>
			<Link
				to={'/forgot-password'}
				className='text-xs text-center hover:text-emerald-500 hover:underline'>
				Forgot password?
			</Link>
			<AuthButton isPending={isPending}>Login</AuthButton>
		</form>
	);
};

export default LoginForm;
