const express = require('express');
const { getTalkerById, readTalkers } = require('../utils/fsUtils');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await readTalkers();
  if (!talkers) return res.status(200).json([]);
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkerById);
});

module.exports = router;