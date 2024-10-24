import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const DetailsProjet = () => {
  const { user } = useContext(AuthContext);
  const { project_id } = useParams();
  const [project, setProject] = useState({
    nom: "",
    pages: [],
  });
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user && user._id && project_id) {
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

  const handleChange = (e, pageId) => {
    setFormData({
      ...formData,
      [pageId]: {
        ...formData[pageId],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e, pageId) => {
    e.preventDefault();
    const updatedPage = formData[pageId];
    console.log("données envoyées : ", updatedPage);
    console.log("project ID : ", project._id);
    console.log("page ID : ", pageId);

    axios
      .put(
        `http://localhost:8000/project/editProjectPage/${project._id}/page/${pageId}`,
        updatedPage,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(
          `${project.nom} a correctement été mis à jour : ${res.data}`
        );
        setProject((prevProject) => ({
          ...prevProject,
          pages: prevProject.pages.map((page) =>
            page._id === pageId ? { ...page, ...updatedPage } : page
          ),
        }));
      })
      .catch((err) => {
        console.log(err);
        setError("Une erreur est survenue lors de la mise à jour du projet.");
      });
  };
  const handleDeleteComment = (commentId, pageId) => {
    axios
      .delete(
        `http://localhost:8000/project/deleteComment/${project_id}/${pageId}/${commentId}`
      )
      .then((res) => {
        console.log("Commentaire supprimé avec succès.");
        setProject((prevProject) => ({
          // On conserve toutes les propriétés du projet actuel
          ...prevProject,
          // On va spécifiquement modifier la liste des pages
          pages: prevProject.pages.map(
            (page) =>
              // Si l'ID de la page correspond à la page dont le commentaire a été supprimé
              page._id === pageId
                ? {
                    // On garde toutes les propriétés de cette page
                    ...page,
                    // On met à jour uniquement la liste des commentaires de cette page
                    comments: page.comments.filter(
                      (comment) => comment._id !== commentId // On garde tous les commentaires sauf celui qui a été supprimé
                    ),
                  }
                : page // Si l'ID ne correspond pas, on ne change rien pour cette page
          ),
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Détails du projet: {project.nom}
      </Typography>

      <Grid container spacing={2}>
        {project.pages.map((page) => (
          <Grid item xs={6} key={page.num}>
            <Card>
              <CardContent>
                <Typography variant="h6">Page {page.num}</Typography>
                {/* État Illustration */}
                <Typography variant="body1">
                  État Illustration: {page.etatIllu}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Illustration</InputLabel>
                  <Select
                    name="etatIllu"
                    value={
                      formData[page._id]?.etatIllu || page.etatIllu || "urgent"
                    }
                    onChange={(e) => handleChange(e, page._id)}
                  >
                    <MenuItem value="urgent">Urgent</MenuItem>
                    <MenuItem value="en cours">En cours</MenuItem>
                    <MenuItem value="en recherche">En recherche</MenuItem>
                    <MenuItem value="fait">Fait</MenuItem>
                  </Select>
                </FormControl>
                {/* État Maquettage */}
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  État Maquettage: {page.etatMaq}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Maquettage</InputLabel>
                  <Select
                    name="etatMaq"
                    value={
                      formData[page._id]?.etatMaq || page.etatMaq || "urgent"
                    }
                    onChange={(e) => handleChange(e, page._id)}
                  >
                    <MenuItem value="urgent">Urgent</MenuItem>
                    <MenuItem value="en cours">En cours</MenuItem>
                    <MenuItem value="en recherche">En recherche</MenuItem>
                    <MenuItem value="fait">Fait</MenuItem>
                  </Select>
                </FormControl>
                {/* Bouton de soumission */}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleSubmit(e, page._id)}
                  >
                    Mettre à jour
                  </Button>
                </Box>
                {/* Commentaires */}
                <Typography variant="body2" style={{ marginTop: "10px" }}>
                  Commentaires: {page.comments.length} commentaire(s)
                </Typography>
                {page.comments.map((comment, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ marginTop: "5px" }}
                  >
                    <Typography variant="body2">
                      - {comment.text} (le{" "}
                      {new Date(comment.createdAt).toLocaleDateString()})
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteComment(comment._id, page._id)}
                      style={{
                        fontSize: "0.875rem",
                        marginLeft: "10px",
                      }}
                    >
                      Supprimer
                    </Button>
                  </Box>
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
