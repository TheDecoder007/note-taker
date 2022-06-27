const fs = require("fs");
const path = require("path");

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming JSON data (middleware function)
app.use(express.json());

//two middleware functions must be set up for server that acccepts POST data
//parse incoming string or array data (middleware function)
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function getNotes() {
  var notes = fs.readFileSync("./db/db.json", "utf8");
  notes = JSON.parse(notes);
  return notes;
}
//GET request to get notes from db.json
app.get("/api/notes", (req, res) => {
  var notes = getNotes();
  res.json(notes);
});

//POST to create a new note
app.post("/api/notes", (req, res) => {
  var notes = getNotes();
  notes = createNewNote(req.body, notes);
  res.json(notes);
});

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return notesArray;
}

//delete route (/:id)
    //read in notes
    //find the note to remove using :id
    //remove it from array
    //write back the new "updated notes" to DB
    //return notes to front end

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
