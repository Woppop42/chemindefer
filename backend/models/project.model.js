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
        ref: 'Page',
        require: false,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        require: true,
    }
})

module.exports = mongoose.model('Project', projectSchema);