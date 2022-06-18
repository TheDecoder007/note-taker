const fs = require("fs");
const path = require('path');
const router = require('express').Router();

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json')
const { note } = require('./db/db.json')


//two middleware functions must be set up for server that acccepts POST data
//parse incoming string or array data (middleware function)
app.use(express.urlencoded({ extended: true}));

//parse incoming JSON data (middleware function)
app.use(express.json());

app.use(express.static('public'));

//GET request to get notes from db.json 
router.get('/api/notes', (req, res) =>{
    // I wrote if statement
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
    
});

router.get('/api/note', (req, res) =>{
    let results = note;
    //I wrote if statement
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//POST to create a new note
router.post('/api/notes', (req, res) => {
    //set id for next index in array
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(note);
});

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('/api/note', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});