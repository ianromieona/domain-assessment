const { Router } = require("express");

import notesCtlr from "../controllers/notes";

// Initialization
const router = Router();

// Requests
router.get("/notes", notesCtlr.getAll);
router.post("/notes", notesCtlr.create);
router.put("/notes/:id", notesCtlr.update);
router.delete("/notes/:id", notesCtlr.remove);

module.exports = router;
