const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dbPath = path.join(__dirname, '../db/db.json');

// GET /api/notes - Should read the `db.json` file and return all saved notes as JSON.
router.get('/notes', function(req, res) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(JSON.parse(data));
  });
});

// POST /api/notes - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
router.post('/notes', function(req, res) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return res.status(500).send(err);
    }
    const notes = JSON.parse(data);
    const newNote = {
      id: Date.now().toString(),
      title: req.body.title,
      text: req.body.text,
    };
    notes.push(newNote);
    fs.writeFile(dbPath, JSON.stringify(notes), function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `
app.delete('/api/notes/:id', function(req, res) {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
      if (err) throw err;

      const notes = JSON.parse(data);
      const noteId = req.params.id;
      const newNotes = notes.filter((note) => note.id !== noteId);

      fs.writeFile('./db/db.json', JSON.stringify(newNotes), function(err) {
        if (err) throw err;

        res.json(newNotes);
      });
    });
  });

  module.exports=router;