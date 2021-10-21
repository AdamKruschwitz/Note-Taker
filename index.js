const express = require('express');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for json and url encoding.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));