import Home from '../routers/public/Home';
import Login from '../routers/public/Login';

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
        element: <h1>Pagina no encontrada</h1> 
    }
];