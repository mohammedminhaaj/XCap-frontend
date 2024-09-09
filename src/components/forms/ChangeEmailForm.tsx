import { Link } from 'react-router-dom';
import { ProfileScreenProps } from '../../pages/Profile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthContext } from '../../store/AuthProvider';
import useToast from '../../hooks/useToast';
import {
	QueryClient,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { changeEmail } from '../../lib/auth_helper';
import { MessageType } from '../../store/MessageProvider';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

type ChangeEmailFormProps = ProfileScreenProps & {
	currentEmail: string;
};

// Form fields
export type ChangeEmailFormInput = {
	email: string;
};

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({
	setIsPasswordScreen,
	currentEmail,
}: ChangeEmailFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<ChangeEmailFormInput>({
		defaultValues: { email: currentEmail },
	});

	const { userToken } = useAuthContext();

	// Custom hook to display toast messages
	const toast = useToast();

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		// Helper function to handle form submission
		mutationFn: changeEmail,
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
				reset({
					email: '',
				});
			} else {
				// Show success message
				toast(payload.message);
				queryClient.invalidateQueries({ queryKey: ['userDetails'] });
			}
		},
		onError: (error) => {
			// Handle errors during the form submission
			toast(error.message, MessageType.ERROR);
			reset({
				email: '',
			});
		},
	});

	// Helper function to handle form submission
	const onSubmit: SubmitHandler<ChangeEmailFormInput> = async (data) => {
		mutate({
			email: data.email,
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
						className={`form-label ${
							errors.email && 'text-red-500'
						}`}
						htmlFor='email-field'>
						Email
					</label>
				</div>
				{errors.email && (
					// Displaying field errors
					<p className='text-xs text-red-500'>
						{errors.email.message}
					</p>
				)}
				<div className='flex flex-col md:flex-row justify-between md:gap-2 gap-5'>
					<button
						type='submit'
						title='Save Changes'
						className='primary-button w-full md:w-fit md:order-3 order-1'
						disabled={isPending || !isDirty}>
						{isPending ? (
							<Loader2 className='animate-spin mx-auto' />
						) : (
							'Save Changes'
						)}
					</button>
					<button
						title='Change Password'
						type='button'
						className='bg-emerald-200 transition-all duration-300 hover:bg-emerald-300 rounded-xl px-4 py-2 w-full md:w-fit order-2 text-xs md:text-base'
						onClick={() => setIsPasswordScreen(true)}>
						Change Password
					</button>
					<Link
						to={'/dashboard'}
						className='flex justify-center items-center transition-all duration-300 gap-2 hover:gap-4 w-full md:w-fit order-3 md:order-1 text-xs md:text-base'>
						<ArrowLeft className='size-4' />
						Go Back
					</Link>
				</div>
			</motion.form>
		</>
	);
};

export default ChangeEmailForm;
