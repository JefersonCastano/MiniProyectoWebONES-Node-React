import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routers/public/Home';
import Login from './routers/public/Login';
import Horario from './routers/coordinador/Horario';
import ProtectedRoute from './routers/ProtectedRoute';
import AuthProvider from './auth/AuthProvider';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/horario',
        element: <Horario />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider> */}
    <App/>

  </React.StrictMode>
);

