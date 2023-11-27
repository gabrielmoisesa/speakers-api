const { fsUtils, dbUtils } = require('../db');
const filterTalkers = require('../utils/filterTalkers');

const get = async (_req, res) => {
  const talkers = await fsUtils.readTalkers();
  if (!talkers) return res.status(200).json([]);
  res.status(200).json(talkers);
};

const getSearch = async (req, res) => {
  const { q, rate, date } = req.query;

  let result = await fsUtils.readTalkers();

  if (q) result = filterTalkers.byQuery(result, q);
  if (rate) result = filterTalkers.byRate(result, rate);
  if (date) result = filterTalkers.byDate(result, date);

  res.status(200).json(result);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const talkerById = await fsUtils.getTalkerById(id);
  res.status(200).json(talkerById);
};

const getDb = async (_req, res) => {
  const [talkers] = await dbUtils.findAll();

  const formattedTalkers = talkers.map((talker) => {
    const { id, name, age } = talker;
    return { 
      id, 
      name, 
      age, 
      talk: { watchedAt: talker.talk_watched_at, rate: talker.talk_rate }, 
    };
  });

  res.status(200).json(formattedTalkers);
};

const post = async (req, res) => {
  const newTalker = req.body;
  await fsUtils.writeTalker(newTalker);
  const talkers = await fsUtils.readTalkers();
  res.status(201).json(talkers[talkers.length - 1]);
};

const putId = async (req, res) => {
  const { id } = req.params;
  const updatedTalker = req.body;
  await fsUtils.updateTalker(id, updatedTalker);
  const talkerById = await fsUtils.getTalkerById(id);
  res.status(200).json(talkerById);
};

const patchRate = async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  await fsUtils.updateTalkerRate(id, rate);
  res.status(204).end();
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  await fsUtils.deleteTalker(id);
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