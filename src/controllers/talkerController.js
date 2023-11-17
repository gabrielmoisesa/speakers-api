const { filterTalkersByQuery, filterTalkersByRate } = require('../utils/filters');
const { readTalkers } = require('../utils/fsUtils');

const handleTalkerSearch = async (req, res) => {
  const { q, rate } = req.query;

  let result = await readTalkers();

  if (q) result = filterTalkersByQuery(result, q);
  if (rate) result = filterTalkersByRate(result, rate);

  res.status(200).json(result);
};

module.exports = { handleTalkerSearch };