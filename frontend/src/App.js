import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InscriptionPage from './pages/InscriptionPage';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import Profil from './pages/ProfilPage'
import {AuthProvider} from './contexts/AuthContext';
import DetailsProjectPage from './pages/DetailsProjectPage';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<InscriptionPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/myProjects" element={<ProjectsPage />}/>
        <Route path="/profile" element={<Profil />}/>
        <Route path="/detailsProjet/:project_id" element={<DetailsProjectPage />}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
