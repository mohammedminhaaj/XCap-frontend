import { SubmitHandler, useForm } from 'react-hook-form';
import { ProfileScreenProps } from '../../pages/Profile';
import useToast from '../../hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../lib/auth_helper';
import { MessageType } from '../../store/MessageProvider';
import { useAuthContext } from '../../store/AuthProvider';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Form fields
export type ChangePasswordFormInput = {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
};

const ChangePasswordForm: React.FC<ProfileScreenProps> = ({
	setIsPasswordScreen,
}: ProfileScreenProps) => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<ChangePasswordFormInput>();

	const { userToken } = useAuthContext();

	// Custom hook to display toast messages
	const toast = useToast();

	const { mutate, isPending } = useMutation({
		// Helper function to handle form submission
		mutationFn: changePassword,
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
			} else {
				// Show success message
				toast(payload.message);
				// Store the auth token
				setIsPasswordScreen(false);
			}
			// Reset the password field on error
			reset({
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: '',
			});
		},
		onError: (error) => {
			// Handle errors during the form submission
			toast(error.message, MessageType.ERROR);
			// Reset the password field on error
			reset({
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: '',
			});
		},
	});

	// Helper function to check if the passwords match
	const matchPasswords: (value: any) => boolean | string = (value: string) =>
		watch('newPassword') === value || "Passwords don't match";

	// Helper function to handle form submission
	const onSubmit: SubmitHandler<ChangePasswordFormInput> = async (data) => {
		mutate({
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
			token: userToken!,
		});
	};

	return (
		<>
			<motion.form
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: -100, opacity: 1 }}
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
				<div className='relative'>
					<input
						id='old-password-field'
						required
						{...register('oldPassword', {
							required: 'This field is required',
							minLength: {
								value: 6,
								message:
									'Password should contain atleast 6 characters',
							},
						})} // Adding validation
						className={`form-input peer ${
							errors.oldPassword && 'error'
						}`}
						title='Old Password'
						type='password'
					/>
					<label
						htmlFor='old-password-field'
						className={`form-label  ${
							errors.oldPassword && 'text-red-500'
						}`}>
						Old Password
					</label>
				</div>
				{errors.oldPassword && (
					// Displaying field errors
					<p className='text-xs text-red-500'>
						{errors.oldPassword.message}
					</p>
				)}
				<div className='relative'>
					<input
						id='new-password-field'
						required
						{...register('newPassword', {
							required: 'This field is required',
							minLength: {
								value: 6,
								message:
									'Password should contain atleast 6 characters',
							},
						})} // Adding validation
						className={`form-input peer ${
							errors.newPassword && 'error'
						}`}
						title='New Password'
						type='password'
					/>
					<label
						htmlFor='new-password-field'
						className={`form-label  ${
							errors.newPassword && 'text-red-500'
						}`}>
						New Password
					</label>
				</div>
				{errors.newPassword && (
					// Displaying field errors
					<p className='text-xs text-red-500'>
						{errors.newPassword.message}
					</p>
				)}
				<div className='relative'>
					<input
						id='confirm-new-password-field'
						required
						{...register('confirmNewPassword', {
							required: 'This field is required',
							minLength: {
								value: 6,
								message:
									'Password should contain atleast 6 characters',
							},
							validate: matchPasswords,
						})} // Adding validation
						className={`form-input peer ${
							errors.confirmNewPassword && 'error'
						}`}
						title='Confirm New Password'
						type='password'
					/>
					<label
						htmlFor='confirm-new-password-field'
						className={`form-label ${
							errors.confirmNewPassword && 'text-red-500'
						}`}>
						Confirm New Password
					</label>
				</div>
				{errors.confirmNewPassword && (
					// Displaying field errors
					<p className='text-xs text-red-500'>
						{errors.confirmNewPassword.message}
					</p>
				)}
				<div className='flex flex-col md:flex-row gap-5 md:gap-2 justify-between items-center'>
					<button
						type='submit'
						title='Save Changes'
						className='primary-button w-full md:w-fit md:order-2 order-1'
						disabled={isPending}>
						{isPending ? (
							<Loader2 className='animate-spin mx-auto' />
						) : (
							'Save Changes'
						)}
					</button>
					<button
						className='flex justify-center items-center transition-all duration-300 gap-2 hover:gap-4 w-full md:w-fit order-2 md:order-1 text-xs md:text-base'
						onClick={() => setIsPasswordScreen(false)}>
						<ArrowLeft className='size-5'/>
						Go Back
					</button>
				</div>
			</motion.form>
		</>
	);
};

export default ChangePasswordForm;
