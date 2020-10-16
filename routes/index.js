// Require dependencies
const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

// Landing page route
router.get('/', (req, res) => {
    res.render('index', { projects });
});

// About page route
router.get('/about', (req, res) => {
    res.render('about');
});

// project pages routes
router.get('/projects/:id', (req, res, next) => {
    const project = projects.find((project) => project.id.toString() === req.params.id);
    
    // If a project exists, load that page
    // Otherwise display a custom 404 Error page
    if(project) {
        res.render('project', { project });
    } else {
        const err = new Error(`Project: ${req.params.id} does not exist!`);
        err.status = 404;
        next(err);
    }
});

module.exports = router;