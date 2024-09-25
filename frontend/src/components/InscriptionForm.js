import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const InscriptionForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''

    });
    const handleChange = (e) => {
        setFormData({
            // Récupération des nouvelles valeurs
            ...formData,
            // Mis à jour de l'élément sélectionné
            [e.target.name]: e.target.value
        });
    };
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/user/createUser', formData)
        .then(res => {
            console.log('Utilisateur enregistré avec succès: ', res.data);
            navigate('/');
        })
        .catch(err => {
            console.log("Erreur lors de la création du compte." + err);
        })
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Inscription
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Nom d'utilisateur"
                name="username"
                variant="outlined"
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                margin="normal"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Mot de passe"
                name="password"
                variant="outlined"
                margin="normal"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                S'inscrire
              </Button>
            </form>
          </Box>
        </Container>
      );
}

export default InscriptionForm;