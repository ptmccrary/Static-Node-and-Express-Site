// Require dependencies
const express = require('express');

const app = express();

// Adds static assets in public folder
app.use('/static', express.static('public'));

// sets view engine to pug files
app.set('view engine', 'pug');


// Middleware
const mainRoute = require('./routes');

app.use(mainRoute);

// 404 Error Handler
app.use((req, res, next) => {
    const err = new Error(`This page doesn't exist`);
    err.status = 404;
    next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
    // If error status is 404, load page-not-found page
    // If error status is 500, load error page
    if(err.status === 404) {
        res.locals.error = err;
        res.status = (err.status || 404);
        return res.render('page-not-found', { err });
    } else {
        res.locals.error = err;
        res.status = (err.status || 500);
        res.render('error', { err });
    }
});

// localhost setup
app.listen(3000, () => {
    console.log('/******* Starting App on localhost:3000 *******/')
})