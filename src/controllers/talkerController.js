const db = require('../db');
const filterTalkers = require('../utils/filterTalkers');
const {
  readTalkers,
  getTalkerById,
  writeTalker,
  updateTalker,
  updateTalkerRate,
  deleteTalker,
} = require('../utils/fsUtils');

const get = async (_req, res) => {
  const talkers = await readTalkers();
  if (!talkers) return res.status(200).json([]);
  res.status(200).json(talkers);
};

const getSearch = async (req, res) => {
  const { q, rate, date } = req.query;

  let result = await readTalkers();

  if (q) result = filterTalkers.byQuery(result, q);
  if (rate) result = filterTalkers.byRate(result, rate);
  if (date) result = filterTalkers.byDate(result, date);

  res.status(200).json(result);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  res.status(200).json(talkerById);
};

const getDb = async (_req, res) => {
  const [talkers] = await db.findAll();

  const formattedTalkers = talkers.map((talker) => {
    // eslint-disable-next-line camelcase
    const { id, name, age, talk_watched_at, talk_rate } = talker;
    return { 
      id, 
      name, 
      age, 
      talk: { watchedAt: talk_watched_at, rate: talk_rate }, 
    };
  });

  res.status(200).json(formattedTalkers);
};

const post = async (req, res) => {
  const newTalker = req.body;
  await writeTalker(newTalker);
  const talkers = await readTalkers();
  res.status(201).json(talkers[talkers.length - 1]);
};

const putId = async (req, res) => {
  const { id } = req.params;
  const updatedTalker = req.body;
  await updateTalker(id, updatedTalker);
  const talkerById = await getTalkerById(id);
  res.status(200).json(talkerById);
};

const patchRate = async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  await updateTalkerRate(id, rate);
  res.status(204).end();
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.status(204).end();
};

module.exports = { 
  get, 
  getSearch, 
  getId,
  getDb,
  post,
  putId,
  patchRate,
  deleteById,
};