import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const ProjectsDisplay = () => {
  // Gestion des erreurs
  const [error, setError] = useState(null);
  // Utilisation du contexte d'authentification pour bien vérifier la présence d'un user et de ses permissions
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
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
            </Box>
          ))
        ) : (
          <Typography>Aucun projet à afficher</Typography>
        )}
      </Box>

      <Button
        onClick={() => navigate("/create-project")}
        variant="contained"
        color="primary"
      >
        Créer un nouveau projet
      </Button>
    </Container>
  );
};

export default ProjectsDisplay;
