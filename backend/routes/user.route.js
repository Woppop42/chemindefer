const express = require('express');
const { createUser, getOneUser, editUser, deleteUser } = require('../controllers/user.controller');
const router = express.Router();

router.post('/createUser', createUser);
router.get('/getUser/:id', getOneUser);
router.put('/editUser/:id', editUser);
router.delete('/deleteUser/:id', deleteUser);


module.exports = router;