const api = require('express').Router();;
const fs = require('fs');

const uuid = require('uuid');

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
    fs.writeFile(filename, JSON.stringify(data, null, '\t'), err);
}

api.get('/notes', (req, res) => {
    readFile('./db/db.json', data => { res.json(data) })
});

// POST request for creating a new note
api.post('/notes', (req, res) => {
    readFile('./db/db.json', data => {
        let note = {
            title: req.body.name,
            text: req.body.text,
            id: uuid.v1()
        }
        data.push(note);
        writeFile('./db/db.json', data);
        res.send("Note saved successfully");
    });
});



module.exports = api;