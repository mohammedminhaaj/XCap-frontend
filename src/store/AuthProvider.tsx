import { createContext, useContext, useState } from 'react';

const AUTH_TOKEN_KEY: string = 'authToken';

interface AuthContextProps {
	userToken: string | null;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
	userToken: null,
	login: (token: string) => {},
	logout: () => {},
});

export const AuthProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	// Manage state of the user
	const [userToken, setUserToken] = useState<string | null>(
		localStorage.getItem(AUTH_TOKEN_KEY)
	);

	// Helper function to store the user token in local storage
	const login = (token: string) => {
		setUserToken(token);
		localStorage.setItem(AUTH_TOKEN_KEY, token);
	};
	
	// Helper function to delete user token from local storage
	const logout = () => {
		setUserToken(null);
		localStorage.removeItem(AUTH_TOKEN_KEY);
	};

	return (
		<AuthContext.Provider value={{ userToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext: () => AuthContextProps = () =>
	useContext(AuthContext);
