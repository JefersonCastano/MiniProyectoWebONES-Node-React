import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { public_routes } from './auth/publicRoutes';
import { coordinador_routes } from './auth/coordinador/coordinadorRoutes';
import { docente_routes } from './auth/docente/docenteRoutes';
import ProtectedRoute from './auth/ProtectedRoute';
import CoorProtectedRoute from './auth/coordinador/CoorProtectedRoute';
import DocProtectedRoute from './auth/docente/DocProtectedRoute';
import AuthProvider from './auth/AuthProvider';

const coor_routes = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [{
      path: '/',
      element: <CoorProtectedRoute />,
      children: coordinador_routes
    
    }]
  }
];
const doc_routes = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [{
      path: '/',
      element: <DocProtectedRoute />,
      children: docente_routes
    
    }]
  }
];

const routes = [...public_routes, ...coor_routes, ...doc_routes];

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
