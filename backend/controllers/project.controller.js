const ProjectModel = require('../models/project.model');
const UserModel = require ('../models/user.model');

module.exports.createProject = async (req, res) => {
    try {
        const {nom, user_id} = req.body;
        if(!nom)
        {
            return res.status(400).json({message: "Veuillez entrer un nom pour le projet."})
        }
        if(!user_id)
        {
            return res.status(400).json({message: "ID utilisateur requis."})
        }
        const userExists = await UserModel.findById(req.body.user_id);
        if(!userExists)
        {
            return res.status(400).json({message: 'Utilisateur introuvable.'})
        }
        const pages = [];
        for(let i = 1; i <= 30; i++)
        {
            pages.push({
                num: i,
                titre: `Page ${i}`,
                majeur: '',
                comments: [],
                etatIllu: "urgent",
                etatMaq: 'urgent',

            });
        }
        const projet = await ProjectModel.create({
            nom: nom,
            user: user_id,
            pages: pages

        });
        await UserModel.findByIdAndUpdate(req.body.user_id, { $push: {projects: projet._id}});
        res.status(200).json(projet);
        console.log("Projet correctement créé.");
    }catch(err)
    {
        console.log(err);
        res.status(500).json({ message: "Erreur lors de la création du projet." });
    }
}

module.exports.getAllProject = async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).json(projects);
    }
    catch (err)
    {
        res.status(400).json({message: "Projets introuvables"});
    }
}

module.exports.getOneProject = async (req, res) => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        res.status(200).json(project);
    }
    catch (err){
        res.status(400).json({message: "Projet Introuvable."})
    }
}
// module.exports.getAllProjectFromUser = async(req, res) => {
//     try{
//         const projects = await ProjectModel.find({
//             user: req.params.id
//         });
//         console.log('Projets récupérés.');
//         return res.status(200).json({projects});
//     }catch (err)
//     {
//         console.log(err);
//         return res.status(400).json({err});
//     }
// }
module.exports.editProject = async (req, res) => {
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedProject);
    }
    catch (err){
        res.status(400).json({message: "Echec de la mise à jour."});
    }
}
module.exports.deleteProject = async (req, res) => {
    try {
        const project = await ProjectModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: `Le projet ${project.nom} a bien été supprimé`});
    } catch {
        res.status(400).json({message: "Echec de la suppression du projet."})
    }
}