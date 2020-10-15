const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get('/', (req, res) => {
    res.render('index', { projects });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/projects/:id', (req, res, next) => {
    const project = projects.find((project) => project.id.toString() === req.params.id);
    
    if(project) {
        res.render('project', { project });
    } else {
        const err = new Error(`Project: ${req.params.id} does not exist!`);
        err.status = 404;
        next(err);
    }
});

module.exports = router;