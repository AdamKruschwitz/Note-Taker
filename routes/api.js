const api = require('express').Router();;
const fs = require('fs');

// Error handling cb
const err = (er) => {
    er ? console.log("process failed: ", er) : console.log("process finished");
}

// File reading helper function
function readFile(filename, cb) {
    fs.readFile(filename, (er, data) => {
        err(er); // record scratch sound effect as code
        data = JSON.parse(data);
        cb(data);
    });
}

// File writing helper function
function writeFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data), err);
}

api.get('/notes', (req, res) => {
    readFile('./db/db.json', data => { res.json(data) })
});

// POST request for creating a new note
api.post('/notes', (req, res) => {
    readFile('./db/db.json', data => {
        // TODO: add unique ID.
        // console.log(req.body);
        data.push(req.body);
        writeFile('./db/db.json', data);
        res.send("Note saved successfully");
    });
});



module.exports = api;