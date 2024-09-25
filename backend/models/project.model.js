const mongoose = require('mongoose');


const projectSchema =  new mongoose.Schema ({
    nom: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()

    },
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Project', projectSchema);