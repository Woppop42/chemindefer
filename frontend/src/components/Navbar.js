import React, {useContext} from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';

const Navbar = () => {
    const {isAuthenticated, logout, user} = useContext(AuthContext);
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Container>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Le Chemin de Fer
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Accueil</Button>
                    {isAuthenticated ? (
                        <>
                            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                Bonjour, {user.username} 
                            </Typography>
                            <Button color="inherit" component={Link} to="/profile">Profil</Button>
                            <Button color="inherit" component={Link} to="/myProjects">Projets</Button>
                            <Button color="inherit" onClick={logout}>Déconnexion</Button>
                            
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Connexion</Button>
                            <Button color="inherit" component={Link} to="/signup">Inscription</Button>
                        </>
                    )}
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;