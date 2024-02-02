// return all records
const handleAll = (academicProvider, app) => {
    app.get('/academic/', (req,resp) => {
        // get data from academic provider
        const academic = academicProvider.getData();
        resp.json(academic);
    });
}

// return just the requested term
const handleSingleTerm = (academicProvider, app) => {
    app.get('/academic/:term', (req,resp) => {
        const academic = academicProvider.getData();
        const termToFind = req.params.term.toLowerCase();
        const filter = academic.filter( (obj) => termToFind === obj.term.toLowerCase());

        if (filter.length > 0) {
            resp.json(filter);
        } else {
            resp.json(jsonMessage(`Term ${termToFind} not found`));
        }
    });
};

// return all the term whose name contains the supplied year or season
const handleNameSearch = (academicProvider, app) => {
    app.get('/academic/term/:substring', (req,resp) => {
        const academic = academicProvider.getData();
        const substring = req.params.substring.toLowerCase();
        const matches = academic.filter( (obj) => obj.term.toLowerCase().includes(substring) );

        if (matches.length > 0) {
            resp.json(matches);
        } else {
            resp.json(jsonMessage(`No term matches found for ${substring}`));
        }
    });
};

const jsonMessage = (msg) => {
    return { message: msg };
};

module.exports = {
    handleAll,
    handleSingleTerm,
    handleNameSearch
};
