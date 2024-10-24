const express = require('express');
const { createProject, getAllProject, getOneProject, editProject, deleteProject, getProjects, editProjectPage, createComment, deleteComment } = require('../controllers/project.controller');

const router = express.Router();

router.post("/createProject", createProject);
router.post("/createComment/:id/page/:pageId/addComments", createComment);
router.get("/getAllProjetcs", getAllProject);
router.get("/getOneProject/:id", getOneProject);
router.put("/editProject/:id", editProject);
router.put("/editProjectPage/:id/page/:pageId", editProjectPage);
router.delete("/deleteProject/:id", deleteProject);
router.delete("/deleteComment/:id/:pageId/:commentId", deleteComment);


module.exports = router;