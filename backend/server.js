const express = require('express');
const path = require('path');
const connectDB = require("./config/db");
require('dotenv').config({ path: "../.env"});
const cors = require("cors");
const port = 8000;

// permet d'accéder à l'ensemble des méthodes du module express
const app = express();
// Connexion du serveur à la bdd 
connectDB();
// Middleware permettant d'autoriser les requêtes venant de différents domaines:
app.use(cors());
// Middleware permettant de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Définition des routes
app.use('/project', require('./routes/project.route'));
app.use('/user', require('./routes/user.route'));
app.use('/auth', require('./routes/auth.route'));


// Middleware pour servir les fichiers statiques du build React
// app.use(express.static(path.join(__dirname, 'frontend/build')));

// Route de fallback pour les autres requêtes vers React
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });



try{

    app.listen(port, () => console.log("le serveur à démarré au port " + port));
}catch(error)
{
    console.log(error);
}