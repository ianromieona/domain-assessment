const express = require("express");
const notes = require("../routes/notes");
const router = express.Router();

// Routes
router.use(notes);

export default router;
