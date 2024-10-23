const express = require('express');
const { createProject, getAllProject, getOneProject, editProject, deleteProject, getProjects, editProjectPage } = require('../controllers/project.controller');

const router = express.Router();

router.post("/createProject", createProject);
router.get("/getAllProjetcs", getAllProject);
router.get("/getOneProject/:id", getOneProject);
router.put("/editProject/:id", editProject);
router.put("/editProjectPage/:id/page/:pageId", editProjectPage);
router.delete("/deleteProject/:id", deleteProject);


module.exports = router;