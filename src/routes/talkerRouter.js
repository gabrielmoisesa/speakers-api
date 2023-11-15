const express = require('express');

const {
  getTalkerById,
  readTalkers,
  writeTalker,
  updateTalker,
  deleteTalker,
  getTalkersByQuery,
} = require('../utils/fsUtils');

const { validateTalker, validateToken, validateId } = require('../middlewares');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await readTalkers();
  if (!talkers) return res.status(200).json([]);
  res.status(200).json(talkers);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkersByQuery = await getTalkersByQuery(q);
  res.status(200).json(talkersByQuery);
});

router.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  res.status(200).json(talkerById);
});

router.post('/', validateToken, validateTalker, async (req, res) => {
  const newTalker = req.body;
  await writeTalker(newTalker);
  const talkers = await readTalkers();
  res.status(201).json(talkers[talkers.length - 1]);
});

router.put('/:id', validateToken, validateId, validateTalker, async (req, res) => {
  const { id } = req.params;
  const updatedTalker = req.body;
  await updateTalker(id, updatedTalker);
  const talkerById = await getTalkerById(id);
  res.status(200).json(talkerById);
});

router.delete('/:id', validateToken, validateId, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.status(204).end();
});

module.exports = router;