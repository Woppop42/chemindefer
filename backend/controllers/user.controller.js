const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.createUser = async (req, res) => {
    try{
        const user = await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,

        });
        res.status(200).json({message: `${user.username} a bien été créé.`});
    }catch(err)
    {
        res.status(400).json({message: "Problème lors de la création du compte."});
    }
}
module.exports.editUser = async (req, res) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json({message: `${updateUser.username} a bien été mis à jour.`});
    } catch(err)
    {
        res.status(400).json({message: "Problème lors de la mise à jour du profil."});
    }
}
module.exports.getOneUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if(!user)
        {
            res.status(400).json({message: "Utilisateur introuvable."});
        }
        res.status(200).json({message: `Utilisateur ${user.username} bien trouvé.`});
    }catch (err)
    {
        res.status(400).json({message: "Utilisateur introuvable."});
    }
}
module.exports.deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if(!user)
        {
            res.status(400).json({message: "Utilisateur introuvable."});
        }
        res.status(200).json({message: "Utilisateur correctement supprimé."});
    }catch (err)
    {
        res.status(400).json({message: "La suppression de l'utilisateur a échoué."});
    }
}
module.exports.login = async (req, res) => {
    try 
    {
        const user = await UserModel.findOne({email: req.body.email});
        console.log('Utilisateur trouvé' + user);
        if(!user)
        {
            return res.status(400).json({message: "Utilisateur introuvable."});
        }
        const verifPassword = await bcrypt.compare(req.body.password, user.password);
        if(!verifPassword)
        {
            return res.status(401).json({message: "Mot de passe incorrect."});
        }
        const token = jwt.sign(
            {id: user._id, email: user.email, username: user.username},
            process.env.TOKEN_JWT,
            {expiresIn: '1h'}
        );
        console.log(token);
        return res.status(201).json({ token, user });
    } catch (err)
    {
        console.log(err);
        return res.status(500).json({ message: "Erreur serveur."});
    }
}
module.exports.logout = async (req, res) => {
    try{
        res.status(200).json({message: "Utilisateur bien déconnecté."})
    }catch(err)
    {
        res.status(400).json({message: 'Erreur.'})
    }
}
module.exports.getProjects = async (req, res) => {
    try{
        const user  = await UserModel.findById(req.params.id)
        .populate({
            path: 'projects',
            model: 'Project'
        }).exec();
        if(!user)
        {
            return res.status(400).json({message: "Utilisateur introuvable."})
        }
        return res.status(200).json(user.projects);

    }catch (err)
    {
        return res.status(400).json(err);
    }
}