const express = require('express');
const { getTalkerById, readTalkers, writeTalker } = require('../utils/fsUtils');
const { validateTalker, validateToken } = require('../middlewares');

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

router.post('/', validateToken, validateTalker, async (req, res) => {
  const newTalker = req.body;
  await writeTalker(newTalker);
  const talkers = await readTalkers();
  res.status(201).json(talkers[talkers.length - 1]);
});

module.exports = router;