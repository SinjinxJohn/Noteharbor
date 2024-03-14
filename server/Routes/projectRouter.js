const express = require('express');
const { addProject, addPage, addPageNote, getProjects } = require('../Controllers/projectController');
const projectRouter = express.Router();

projectRouter.use(express.json());


projectRouter.get('/getprojects/:projectId', getProjects);
projectRouter.post('/projects',addProject);
projectRouter.post('/projects/:projectId/pages',addPage);
projectRouter.post('/projects/:projectId/pages/:pageId/notes',addPageNote);

module.exports = projectRouter;
