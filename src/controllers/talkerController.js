const { 
  getTalkersByQueryAndRate, 
  getTalkersByRate, 
  getTalkersByQuery } = require('../utils/fsUtils');

const handleTalkerSearch = async (req, res) => {
  const { q, rate } = req.query;

  if (q && rate) return res.status(200).json(await getTalkersByQueryAndRate(q, rate));

  if (rate) {
    const talkersByRate = await getTalkersByRate(rate);
    return res.status(200).json(talkersByRate);
  }

  const talkersByQuery = await getTalkersByQuery(q);
  res.status(200).json(talkersByQuery);
};

module.exports = { handleTalkerSearch };