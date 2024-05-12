import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
