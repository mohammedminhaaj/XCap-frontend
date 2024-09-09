export type ServerResponse = {
	message: string;
};

export type UserData = ServerResponse & {
	data: { username: string; email: string };
};

export type UserFile = {
	id: number;
	status: string;
	duration: string | null | undefined;
	file_name: string;
	upload_time: string;
	error_message: string | null | undefined;
	processed_file_path: string;
};

export type UserFiles = ServerResponse & {
	data: UserFile[];
	count: number;
};
