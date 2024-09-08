import { SubmitHandler, useForm } from 'react-hook-form';
import useToast from '../../hooks/useToast';
import { useAuthContext } from '../../store/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../lib/auth_helper';
import { MessageType } from '../../store/MessageProvider';
import { Link, redirect } from 'react-router-dom';
import AuthButton from '../AuthButton';

// Form fields
export type SignupFormFormInput = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const SignupForm: React.FC = () => {
	const {
		register,
		watch,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SignupFormFormInput>();

	// Custom hook to display toast messages
	const toast = useToast();

	// Helper function to store the auth token after successful login
	const { login: loginLocally } = useAuthContext();

	const { mutate, isPending } = useMutation({
		// Helper function to handle form submission
		mutationFn: signup,
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
				reset({ password: '', confirmPassword: '' });
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
			reset({ password: '', confirmPassword: '' });
		},
	});

	// Helper function to check if the passwords match
	const matchPasswords: (value: any) => boolean | string = (value: string) =>
		watch('password') === value || "Passwords don't match";

	// Helper function to handle form submission
	const onSubmit: SubmitHandler<SignupFormFormInput> = async (data) => {
		mutate({
			username: data.username,
			email: data.email,
			password: data.password,
		});
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
			<div className='relative'>
				<input
					id='confirm-password-field'
					required
					{...register('confirmPassword', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message:
								'Password should contain atleast 6 characters',
						},
						validate: matchPasswords,
					})} // Adding validation
					className={`form-input peer ${
						errors.confirmPassword && 'error'
					}`}
					title='Confirm Password'
					type='password'
				/>
				<label
					htmlFor='confirm-password-field'
					className={`form-label ${
						errors.confirmPassword && 'text-red-500'
					}`}>
					Confirm Password
				</label>
			</div>
			{errors.confirmPassword && (
				// Displaying field errors
				<p className='text-xs text-red-500'>
					{errors.confirmPassword.message}
				</p>
			)}
			<Link
				to={'/login'}
				className='text-xs text-center  hover:text-emerald-500 hover:underline'>
				Already have an account?
			</Link>
			<AuthButton isPending={isPending}>Sign Up</AuthButton>
		</form>
	);
};

export default SignupForm;
