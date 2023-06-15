const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController");
const express = require("express");
const router = express.Router();

router.get("/getProjects", getProjects);
router.post("/createProject", createProject);
router.post("/updateProject", updateProject);
router.delete('/:id', deleteProject);

module.exports = router;