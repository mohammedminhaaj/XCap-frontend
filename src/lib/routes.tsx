import { createBrowserRouter, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';

export const router = createBrowserRouter([
	/*
		Defining all the routes inside the application
	*/
	{
		path: '/',
		element: <Navigate to='/login' replace={true} />,
		errorElement: <NotFound />, // Not found page
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />,
	},
]);
