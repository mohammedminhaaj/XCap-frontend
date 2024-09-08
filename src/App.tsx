import { RouterProvider } from 'react-router-dom';
import Toast from './components/Toast';
import { Providers } from './store/Providers';
import { router } from './lib/routes';

const App: React.FC = () => {
	return (
		<Providers>
			<Toast />
			<RouterProvider router={router} />
		</Providers>
	);
};

export default App;
