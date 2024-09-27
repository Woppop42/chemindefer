import React, { useContext } from "react";
import { Container, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
// import axios from "axios";

const Profil = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          {user.username}
        </Typography>
      </Container>
    );
  }
};

export default Profil;
