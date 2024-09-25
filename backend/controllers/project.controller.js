const ProjectModel = require('../models/project.model');

module.exports.createProject = async (req, res) => {
    try {
        if(!req.body.nom)
        {
            return res.status(400).json({message: "Veuillez entrer un nom pour le projet."})
        }
        projet = await new ProjectModel.create({
            nom: req.body.nom,
            user: req.session.user_id,

        });
        res.status(200).json(projet);
        console.log("Projet correctement créé.");
    }catch(err)
    {
        console.log(err);
        res.status(500).json({ message: "Erreur lors de la création du projet." });
    }
}