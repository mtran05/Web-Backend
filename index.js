const path = require('path');
const express = require('express');
const app = express();
// reference our own modules
const academicProvider = require('./scripts/academic-provider.js');
const academicHandler = require('./scripts/academic-router.js');

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Headers', 'Authorization,Accept,Origin,DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range')
        .header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE,PATCH');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}

app.use(corsMiddleware);

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