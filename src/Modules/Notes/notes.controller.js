import {Router} from "express";
import * as notesService from "./notes.service.js";

const router = Router();

router.post("/", notesService.CreateSingleNote);
router.patch("/all", notesService.UpdatesTheTitleOfAllNotes);
router.patch("/:noteId", notesService.updateSingleNote);
router.put("/:noteId", notesService.replaceSingleNote);
router.delete("/:noteId", notesService.deleteSingleNote);
router.get("/paginate-sort", notesService.RetrievePaginatedList);
router.get("/id/:noteId", notesService.getNodeById);
router.get("/note-by-content",notesService.getNoteByContent);
router.get("/note-with-user", notesService.getNotesWithUser);
router.get("/aggregate", notesService.getNotesAggregate);
router.delete("/", notesService.deleteAllNotes);
export default router;