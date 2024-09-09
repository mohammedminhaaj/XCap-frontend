import { UserData } from './types';
import { BASE_URL, constructedQuery } from './utils';

export const login = async (data: { username: string; password: string }) => {
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

export const signup = async (data: {
	username: string;
	email: string;
	password: string;
}) => {
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

export const forgotPassword = async (data: {
	email: string;
	username: string;
}) => {
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

export const changeEmail = async (data: { email: string; token: string }) => {
	/*
		Helper function to change email
	*/
	const response = await constructedQuery(
		`/api/auth/change-email/`,
		'POST',
		data.token,
		{
			email: data.email,
		}
	);

	return response;
};

export const changePassword = async (data: {
	oldPassword: string;
	newPassword: string;
	token: string;
}) => {
	/*
		Helper function to change password
	*/
	const response = await constructedQuery(
		`/api/auth/change-password/`,
		'POST',
		data.token,
		{
			old_password: data.oldPassword,
			new_password: data.newPassword,
		}
	);

	return response;
};

export const getUserDetails = async (token: string) => {
	/*
		Helper function to get user details
	*/
	const response = await constructedQuery(
		'/api/auth/get-user/',
		'GET',
		token
	);

	// Handle response errors
	if (response.status >= 400) {
		const data = (await response.json()) as UserData;
		throw new Error(data.message);
	}

	return (await response.json()) as UserData;
};
