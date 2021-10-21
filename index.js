const express = require('express');
const fs = require('fs');
const path = require('path');

// Custom middleware
const api = require('./routes/api');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for json and url encoding.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Listen on port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);