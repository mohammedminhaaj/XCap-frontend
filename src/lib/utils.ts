export const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:8000';

export const constructedQuery: (
	url: string,
	method: string,
	token: string,
	body?: Record<string, any> | null | FormData,
	headers?: Record<string, string>
) => Promise<Response> = (
	url: string,
	method: string,
	token: string,
	body: Record<string, any> | null | FormData = null,
	headers: Record<string, string> = { 'Content-Type': 'application/json' }
) =>
	/*
		Helper function to construct the fetch object 
		with necessary headers
	*/
	fetch(`${BASE_URL}${url}`, {
		method: method,
		headers: {
			...headers,
			Authorization: `Token ${token}`,
		},
		...(body && { body: JSON.stringify(body) }),
	});
