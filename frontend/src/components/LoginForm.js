import React, {useState, useContext} from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';


const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const {setIsAuthenticated, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/user/login", formData)
        .then(res => {
          const user = res.data.user;
          const token = res.data.token;
          setIsAuthenticated(true);
          setUser(user);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Utilisateur connecté', user, token);
            navigate('/');
        })
        .catch(err => {
            setError(err.response?.data?.message || "Une erreur est survenue");
            console.log(err);
        })
    }

    return (
        <Container maxWidth="sm">
          <Box 
            sx={{ 
              mt: 5, 
              p: 3, 
              boxShadow: 3, 
              borderRadius: 2, 
              textAlign: 'center',
              backgroundColor: '#f9f9f9'
            }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Connexion
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                label="Mot de passe"
                variant="outlined"
                name="password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, p: 1 }}
              >
                Se connecter
              </Button>
              {error && <p>{error}</p>}
            </form>
          </Box>
        </Container>
      );
}

export default LoginForm;
