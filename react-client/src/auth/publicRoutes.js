import Home from '../views/public/Home';
import Login from '../views/public/Login';
import NotFound from '../views/public/NotFound';

export const public_routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '*', 
        element: <NotFound />
    }
];