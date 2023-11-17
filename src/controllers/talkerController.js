const filterTalkers = require('../utils/filterTalkers');
const { readTalkers } = require('../utils/fsUtils');

const handleTalkerSearch = async (req, res) => {
  const { q, rate, date } = req.query;

  let result = await readTalkers();

  if (q) result = filterTalkers.byQuery(result, q);
  if (rate) result = filterTalkers.byRate(result, rate);
  if (date) result = filterTalkers.byDate(result, date);

  res.status(200).json(result);
};

module.exports = { handleTalkerSearch };