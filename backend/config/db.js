// Fichier de connexion à notre bdd (ici MongoDB via Mongoose)

const mongoose = require("mongoose");


const connectDB = async () => {
    try
    {
        mongoose.set('strictQuery', false);

        // Connexion à la bdd grâce à la connexion string stocké dans le fichier .env
        console.log("MONGO_URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo connecté.");
    } catch(err)
    {
        // Affichage des erreurs en console et arrêt de la connexion en cas d'erreur.
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;