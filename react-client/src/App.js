import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './routers/public/Login';
import Home from './routers/public/Home';
import AuthProvider from './auth/AuthProvider';
import Horario from './routers/coordinador/Horario';
import ProtectedRoute from './routers/ProtectedRoute';

function App() {
  return (
    <div >
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/horario" element={<Horario />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
