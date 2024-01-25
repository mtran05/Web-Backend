const path = require('path');
const express = require('express');
const app = express();
// reference our own modules
const companyProvider = require('./scripts/company-provider.js');
const companyHandler = require('./scripts/company-router.js');
// handle requests for static resources
//app.use('/static', express.static(path.join(__dirname, 'public')));
companyHandler.handleAll(companyProvider, app);
companyHandler.handleSingleSymbol(companyProvider, app);
companyHandler.handleNameSearch(companyProvider, app);
// for anything else, display 404 errors
app.use( (req,resp) => {
    resp.status(404).send('Unable to find the requested resource!');
});
// use port in .env file or 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});