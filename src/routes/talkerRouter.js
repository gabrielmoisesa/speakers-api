const express = require('express');

const {
  getTalkerById,
  readTalkers,
  writeTalker,
  updateTalker,
  deleteTalker,
  updateTalkerRate,
} = require('../utils/fsUtils');

const {
  validateTalker,
  validateToken,
  validateId,
  validateSearch,
  validateRatePatch,
} = require('../middlewares');
const { handleTalkerSearch } = require('../controllers/talkerController');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await readTalkers();
  if (!talkers) return res.status(200).json([]);
  res.status(200).json(talkers);
});

router.get('/search', validateToken, validateSearch, handleTalkerSearch);

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

router.patch('/rate/:id', validateToken, validateId, validateRatePatch, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  await updateTalkerRate(id, rate);
  res.status(204).end();
});

router.delete('/:id', validateToken, validateId, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.status(204).end();
});

module.exports = router;