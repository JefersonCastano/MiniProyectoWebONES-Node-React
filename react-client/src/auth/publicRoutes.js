import Home from '../routers/public/Home';
import Login from '../routers/public/Login';
import NotFound from '../routers/public/NotFound';


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