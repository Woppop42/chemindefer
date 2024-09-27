import React, {useState, useContext} from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const CreateProjectForm = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        nom: '',
        nbPages: 0,
        user_id: user._id
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/project/createProject', formData)
        .then(res => {
            const newProject = res.data;
            console.log('Projet créé avec succès : ' + newProject);
            navigate('/myProjects');
        })  
        .catch(err =>{
            console.log(error);
            setError('Erreur lors de la création du projet');
        })
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Créer un nouveau projet
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nom du projet"
                        name="nom"
                        variant="outlined"
                        fullWidth
                        value={formData.nom}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        select
                        label="Nombre de pages"
                        name="nbPages"
                        value={formData.nbPages}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    >
                        {/* Génération des options de 1 à 50 pour la sélection */}
                        {[...Array(50)].map((_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                                {i + 1}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Créer le projet
                    </Button>
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                </form>
            </Box>
        </Container>
    );


}
export default CreateProjectForm;