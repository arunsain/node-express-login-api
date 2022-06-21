const express = require("express");
const router = express.Router();
//const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Route 1 => GET : localhost:5000/api/notes/fetchallnotes fetch all note
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  obj = {
    name: req.user.id,
    email: notes,
  };
  res.json(obj);
});

// Route 2 => POST : localhost:5000/api/notes/addnotes add new note
router.post(
  "/addnotes",
  [
    body("title", "title must be 5 characer").isLength({ min: 5 }),
    body("description", "description must be 5 characer").isLength({ min: 5 }),
  ],
  fetchUser,
  async (req, res) => {
    // this code run if request parameter fail in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tags } = req.body;
    try {
      //  create user notes
      const note = await Notes.create({
        user: req.user.id,
        title: title,
        description: description,
        tags: tags,
      });

      note.save();
      return res.status(200).json({ note });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("some error occured");
    }
  }
);

// Route 3 => PUT : localhost:5000/api/notes/updatenotes/1  update note
router.put("/updatenotes/:id", fetchUser, async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const updateNote = {};
    if (title) {
      updateNote.title = title;
    }
    if (description) {
      updateNote.description = description;
    }
    if (tags) {
      updateNote.tags = tags;
    }

    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("access denied");
    }

    const noteData = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updateNote },
      { new: true }
    );
    res.send(noteData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("some error occured");
  }
});

// Route 4 => DELETE : localhost:5000/api/notes/deletenotes/1  delete note
router.delete("/deletenotes/:id", fetchUser, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("access denied");
    }

    const noteData = await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "note delete successfully", noteData: noteData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("some error occured");
  }
});

module.exports = router;
