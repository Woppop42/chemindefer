const ProjectModel = require("../models/project.model");
const UserModel = require("../models/user.model");

module.exports.createProject = async (req, res) => {
  try {
    const { nom, user_id, p } = req.body;

    if (!nom) {
      return res
        .status(400)
        .json({ message: "Veuillez entrer un nom pour le projet." });
    }
    if (!user_id) {
      return res.status(400).json({ message: "ID utilisateur requis." });
    }
    const userExists = await UserModel.findById(req.body.user_id);
    if (!userExists) {
      return res.status(400).json({ message: "Utilisateur introuvable." });
    }
    const pages = [];
    for (let i = 1; i <= p; i++) {
      pages.push({
        num: i,
        titre: `Page ${i}`,
        majeur: "",
        comments: [],
        etatIllu: "urgent",
        etatMaq: "urgent",
      });
    }
    const projet = await ProjectModel.create({
      nom: nom,
      user: user_id,
      pages: pages,
    });
    await UserModel.findByIdAndUpdate(req.body.user_id, {
      $push: { projects: projet._id },
    });
    res.status(200).json(projet);
    console.log("Projet correctement créé.");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur lors de la création du projet." });
  }
};

module.exports.getAllProject = async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ message: "Projets introuvables" });
  }
};

module.exports.getOneProject = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: "Projet Introuvable." });
    console.log(err);
  }
};
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
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: "Echec de la mise à jour." });
  }
};
module.exports.deleteProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `Le projet ${project.nom} a bien été supprimé` });
  } catch {
    res.status(400).json({ message: "Echec de la suppression du projet." });
  }
};
module.exports.editProjectPage = async (req, res) => {
  try {
    const projet = await ProjectModel.findById(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: "Projet introuvable." });
    }
    const page = projet.pages.id(req.params.pageId);
    if (!page) {
      return res.status(404).json({ message: "Page introuvable." });
    }
    // Utilisation de Object.assign() car on accède a un sous-document du model Project
    const newPage = Object.assign(page, req.body);
    await projet.save();
    res.status(200).json({ message: "Page mise à jour avec succès." });
    console.log(newPage);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
module.exports.createComment = async (req, res) => {
  try {
    const projet = await ProjectModel.findById(req.params.id);
    const page = projet.pages.id(req.params.pageId);
    if (!page) {
      return res.status(400).json({ message: "Page introuvable." });
    }
    page.comments.push(req.body);
    await projet.save();
    console.log(projet);
    res.status(200).json({ message: "Commentaire ajouter avec succès." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Erreur." });
  }
};
module.exports.deleteComment = async (req, res) => {
  try {
    const projet = await ProjectModel.findById(req.params.id);
    const page = projet.pages.id(req.params.pageId);
    if (!page) {
      return res.status(400).json({ message: "Page introuvable." });
    }
    page.comments.pull(req.params.commentId);

    await projet.save();
    console.log("Commentaire supprimé avec succès.");
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Erreur lors de la suppression du commentaire." });
  }
};
