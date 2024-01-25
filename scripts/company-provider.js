const path = require('path');
const fs = require('fs').promises;
// for now, we will get our data by reading the provided json file
const jsonPath = path.join(__dirname, '../public', 'companies.json');
// get data asynchronously
let companies;
getCompanyData(jsonPath);
async function getCompanyData(jsonPath) {
    try {
    const data = await fs.readFile(jsonPath, "utf-8");
    companies = JSON.parse(data);
    }
    catch (err) { console.log('Error reading ' + jsonPath); }
}
function getData() {
    return companies;
}
// specifies which objects will be available outside of module
module.exports = { getData };