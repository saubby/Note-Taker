var uniqid = require("uniqid");
const express = require("express");
const router = express.Router();
const database = require("../db/database");


router.get("/api/notes", async function (req, res) {
    const notes = await database.getNotes();
    return res.json(notes);
});

router.post("/api/notes", async function (req, res) {
    const Notes = await database.getNotes();
    let newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text,
    };
    await database.addoneNote([...Notes, newNote]);
    return res.send(newNote);
});

router.delete("/api/notes/:id", async function (req, res) {
    const noteTobeDeleted = req.params.id;
    const Notes = await database.getNotes();
    const newNote = Notes.filter((note) => note.id !== noteTobeDeleted);

    await database.dltNote(newNote);
    return res.send(newNote);
});

module.exports = router;