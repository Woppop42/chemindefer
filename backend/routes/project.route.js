const express = require('express');
const { createProject, getAllProject, getOneProject, editProject, deleteProject } = require('../controllers/project.controller');
const router = express.Router();

router.post("/createProject", createProject);
router.get("/getAllProjetcs", getAllProject);
router.get("/getProject/:id", getOneProject);
router.put("/editProject/:id", editProject);
router.delete("/deleteProject/:id", deleteProject);

module.exports = router;