const path = require('path');
const express = require('express');
const app = express();
// reference our own modules
const academicProvider = require('./scripts/academic-provider.js');
const academicHandler = require('./scripts/academic-router.js');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type','Authorization');
    res.sendStatus(200);
    next();
});

// handle requests for static resources
//app.use('/static', express.static(path.join(__dirname, 'public')));
academicHandler.handleAll(academicProvider, app);
academicHandler.handleSingleTerm(academicProvider, app);
academicHandler.handleNameSearch(academicProvider, app);

// for anything else, display 404 errors
app.use( (req,resp) => {
    resp.status(404).send('Unable to find the requested resource!');
});
// use port in .env file or 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});