import express from 'express';
import notesController from '../controllers/notesController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, notesController.createNote);
router.get('/', authMiddleware, notesController.getAllNotes);
router.get('/:id', authMiddleware, notesController.getNoteById);
router.put('/:id', authMiddleware, notesController.updateNote);
router.delete('/:id', authMiddleware, notesController.deleteNote);

export default router;
