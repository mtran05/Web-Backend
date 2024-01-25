// return all companies
const handleAll = (companyProvider, app) => {
    app.get('/companies/', (req,resp) => {
    // get data from company provider
    const companies = companyProvider.getData();
    resp.json(companies);
    } );
}
   // return just the requested company
const handleSingleSymbol = (companyProvider, app) => {
    app.get('/companies/:symbol', (req,resp) => {
    const companies = companyProvider.getData();
    const symbolToFind = req.params.symbol.toUpperCase();
    const stock = companies.filter(obj => symbolToFind === obj. 
    symbol);
    if (stock.length > 0) {
    resp.json(stock);
    } else {
    resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
    }
    });
};
   // return all the company whose name contains the supplied text
const handleNameSearch = (companyProvider, app) => {
    app.get('/companies/name/:substring', (req,resp) => {
    const companies = companyProvider.getData();
    const substring = req.params.substring.toLowerCase();
    const matches = companies.filter( (obj) =>
    obj.name.toLowerCase().includes(substring) );
    if (matches.length > 0) {
    resp.json(matches);
    } else {
    resp.json(jsonMessage(
    `No company matches found for ${substring}`));
    }
    });
};
const jsonMessage = (msg) => {
    return { message: msg };
};
module.exports = {
    handleAll,
    handleSingleSymbol,
    handleNameSearch
};
