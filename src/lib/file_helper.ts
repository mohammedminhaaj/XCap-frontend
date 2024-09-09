import { ServerResponse, UserFiles } from './types';
import { BASE_URL, constructedQuery } from './utils';

export const getUserFiles = async (
	token: string,
	limit: string | null | undefined = undefined,
	search: string | null | undefined = undefined,
	page: string | null | undefined = undefined
) => {
	/*
		Helper function to get user files
	*/
	// Defining base URL
	let baseUrl = '/api/xml/get-user-files/?';
	const queryList: string[] = [];

	// Check if the search has any value
	if (search) queryList.push(`search=${encodeURIComponent(search)}`);
	// Check if the page has any value
	if (page) queryList.push(`page=${page}`);
	// Check if the limit has any value
	if (limit) queryList.push(`limit=${limit}`);

	// Construct the query string
	const queryString = queryList.length > 0 ? queryList.join('&') : '';
	// Append the query string
	const fullUrl = `${baseUrl}${queryString}`;
	// Call the helper function which returns a fetch object
	const response = await constructedQuery(fullUrl, 'GET', token);

	// Handle response errors
	if (response.status >= 400) {
		const data = (await response.json()) as UserFiles;
		throw new Error(data.message);
	}

	return (await response.json()) as UserFiles;
};

export const uploadFiles = async (data: { files: File[]; token: string }) => {
	/*
		Helper function to upload xml files
	*/

	// Creating new form data instance
	const formData = new FormData();

	// Push files to form data
	data.files.forEach((file) => {
		formData.append('files', file);
	});

	// Send the files
	const response = await fetch(`${BASE_URL}/api/xml/upload-file/`, {
		method: 'POST',
		headers: {
			Authorization: `Token ${data.token}`,
		},
		body: formData,
	});

	// Handle response errors
	if (response.status >= 400) {
		const data = (await response.json()) as ServerResponse;
		throw new Error(data.message);
	}

	return (await response.json()) as ServerResponse;
};
