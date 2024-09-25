const mongoose = require('mongoose');

// Définition d'un sous document comms pour le schema Page
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // PE : Définir un état pour code couleur selon urgence
})


const pageSchema = new mongoose.Schema ({
    titre: {
        type: String,
        required: false
    },
    majeur: {
        type: String,
        required: false
    },
    comments: [commentSchema],
    etatIllu: {
        type: String,
        enum: ["urgent", "fait", "en cours", "en recherche"],
        required: false,
    },
    etatMaq: {
        type: String,
        enum: ["urgent", "en attente", "fait", "en cours"],
        required: false
    },
    num: {
        type: int,
        required: true,
    },
    projet: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },

})

module.exports = mongoose.model("Page", pageSchema);