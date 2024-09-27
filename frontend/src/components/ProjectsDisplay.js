import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Typography, Box, Card, CardContent } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import CreateProjectForm from "./CreateProject";

const ProjectsDisplay = () => {
  // Gestion des erreurs
  const [error, setError] = useState(null);
  // Utilisation du contexte d'authentification pour bien vérifier la présence d'un user et de ses permissions
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  // Gestion de la visibilité du formulaire de création de projet
  const [showForm, setShowForm] = useState(false);
  // Hook de navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`http://localhost:8000/user/getProjects/${user._id}`)
        .then((res) => {
          console.log(res.data);
          setProjects(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [user]);
  const handleCreateProjectClick = () => {
    setShowForm(!showForm);
    console.log('ok');
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Vos Projets
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Box>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Box key={project._id} mb={2}>
              <Typography variant="h6">{project.nom}</Typography>
              <Typography>{project.createdAt}</Typography>
              <Button color="primary" component={Link} to={`/detailsProjet/${project._id}`}>Détails</Button>
            </Box>
          ))
        ) : (
          <Typography>Aucun projet à afficher</Typography>
        )}
      </Box>

      <Button
        onClick={handleCreateProjectClick}
        variant="contained"
        color="primary"
      >
        Créer un nouveau projet
      </Button>

      {/* Affichage conditionnel de la card avec le formulaire */}
      {showForm && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h5">Nouveau projet</Typography>
            <CreateProjectForm /> {/* Formulaire de création de projet */}
          </CardContent>
        </Card>
      )}

    </Container>
  );
};

export default ProjectsDisplay;
