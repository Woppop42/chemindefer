const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        // Permet d'accéder aux différents projets fait par l'utilisateur (array de project)
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }]
    }
)
// Middleware pour hasher le mot de passe
// Utilisation de pre('save') permettant le hashage du mdp avant l'enregistrement de l'User en bdd
userSchema.pre('save', async function(next){
    // Vérifie si le champ password a été modifié
    if(!this.isModified('password')) return next();
    // hashage du mot de passe
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("User", userSchema);