const express = require('express');

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoute = require('./routes');

app.use(mainRoute);

app.use((req, res, next) => {
    const err = new Error(`This page doesn't exist`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if(err.status === 404) {
        res.locals.error = err;
        res.status = (err.status);
        return res.render('page-not-found', { err });
    } else if(err.status === 500) {
        res.locals.error = err;
        res.status = (err.status);
        res.render('error', { err });
    }
});

app.listen(3000, () => {
    console.log('/******* Starting App on localhost:3000 *******/')
})