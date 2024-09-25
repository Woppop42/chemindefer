const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: "../.env"});

// Middleware de vérification du token
const verifyToken = (res, req, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(400).json({authenticated: false});
    jwt.verify(token, process.env.TOKEN_JWT, (err, decoded) => {
        if(err) return res.status(400).json({authenticated: false});
        req.userId = decoded.id;
        next();
    });
};
router.get('/check', verifyToken, (req, res) =>{
    res.json({authenticated: true});
});

module.exports = router;