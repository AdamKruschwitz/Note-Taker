const api = require('express').Router();;
const fs = require('fs');

// Error handling cb
const err = (er) => {
    er ? console.log("process failed: ", er) : console.log("process finished");
}

api.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (er, data) => {
        err(er); // record scratch sound effect as code
        data = JSON.parse(data);
        res.json(data);
    });
});

module.exports = api;