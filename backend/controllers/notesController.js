import Note from '../models/Note.js';

const notesController = {
  createNote: async (req, res) => {
    const { title, content, tags } = req.body;
    await Note.create({ title, content, tags, userId: req.userId });
    res.status(201).json({ message: 'Note created successfully.' });
  },
  getAllNotes: async (req, res) => {
    const notes = await Note.findAll({ where: { userId: req.userId } });
    res.status(200).json(notes);
  },
  getNoteById: async (req, res) => {
    const note = await Note.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }
    res.status(200).json(note);
  },
  updateNote: async (req, res) => {
    const { title, content, tags } = req.body;
    await Note.update({ title, content, tags }, { where: { id: req.params.id, userId: req.userId } });
    res.status(200).json({ message: 'Note updated successfully.' });
  },
  deleteNote: async (req, res) => {
    await Note.destroy({ where: { id: req.params.id, userId: req.userId } });
    res.status(200).json({ message: 'Note deleted successfully.' });
  },
};

export default notesController;
