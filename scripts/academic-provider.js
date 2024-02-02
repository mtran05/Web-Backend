const path = require('path');
const fs = require('fs').promises;
//current directory + ... + file name
const jsonPath = path.join(__dirname, '../public', 'academic.json');

// get data asynchronously
let academic;
getAcademicData(jsonPath);

async function getAcademicData(jsonPath) {
    try {
        const data = await fs.readFile(jsonPath, "utf-8");
        academic = JSON.parse(data);
    }
    catch (err) { console.log('Error reading ' + jsonPath); }
}

function getData() {
    return academic;
}

// specifies which objects will be available outside of module
module.exports = { getData };