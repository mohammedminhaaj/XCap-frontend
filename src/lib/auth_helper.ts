import { BASE_URL } from './utils';

export const login = async (data: Record<'username' | 'password', string>) => {
	/*
		Helper function to handle login
	*/
	const response = await fetch(`${BASE_URL}/api/auth/login/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: data.username,
			password: data.password,
		}),
	});
	return response;
};

export const signup = async (
	data: Record<'username' | 'email' | 'password', string>
) => {
	/*
		Helper function to handle signup
	*/
	const response = await fetch(`${BASE_URL}/api/auth/signup/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: data.username,
			email: data.email,
			password: data.password,
		}),
	});
	return response;
};

export const forgotPassword = async (
	data: Record<'email' | 'username', string>
) => {
	/*
		Helper function to handle forgot password
	*/
	const response = await fetch(`${BASE_URL}/api/auth/forgot-password/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: data.username,
			email: data.email,
		}),
	});
	return response;
};
