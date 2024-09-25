import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InscriptionPage from './pages/InscriptionPage';
import LoginPage from './pages/LoginPage';
import {AuthProvider} from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<InscriptionPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
