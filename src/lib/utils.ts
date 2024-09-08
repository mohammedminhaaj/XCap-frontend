export const BASE_URL = 'http://127.0.0.1:8000';

export const constructedQuery: (
	url: string,
	method: string,
	token: string,
	body?: Record<string, string> | null
) => Promise<Response> = (
	url: string,
	method: string,
	token: string,
	body: Record<string, string> | null = null
) =>
	/*
		Helper function to construct the fetch object 
		with necessary headers
	*/
	fetch(`${BASE_URL}${url}`, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		...(body && { body: JSON.stringify(body) }),
	});
