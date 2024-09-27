import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const DetailsProjet = () => {
  const { user } = useContext(AuthContext);
  const { project_id } = useParams();
  const [project, setProject] = useState({
    nom: '',
    pages: []
  }
    );
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8000/project/getOneProject/${project_id}`)
        .then((res) => {
          setProject(res.data);
          console.log("Projet récupéré avec succès.");
        })
        .catch((err) => {
          console.log(err);
          setError("Une erreur est survenue.");
        });
    }
  }, [project_id]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Détails du projet: {project.nom}
      </Typography>

      <Grid container spacing={2}>
        {project.pages.map((page, index) => (
          <Grid item xs={6} key={page.num}>
            <Card>
              <CardContent>
                <Typography variant="h6">Page {page.num}</Typography>
                <Typography variant="body1">
                  État Illustration: {page.etatIllu || "Non défini"}
                </Typography>
                <Typography variant="body1">
                  État Maquettage: {page.etatMaq}
                </Typography>
                <Typography variant="body2">
                  Commentaires: {page.comments.length} commentaire(s)
                </Typography>
                {page.comments.map((comment, idx) => (
                  <Typography key={idx} variant="body2">
                    - {comment.text} (le{" "}
                    {new Date(comment.createdAt).toLocaleDateString()})
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DetailsProjet;
