const fs = require("fs");
const path = require('path');

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json')


//two middleware functions must be set up for server that acccepts POST data
//parse incoming string or array data (middleware function)
app.use(express.urlencoded({ extended: true}));

//parse incoming JSON data (middleware function)
app.use(express.json());

app.use(express.static('public'));







app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});