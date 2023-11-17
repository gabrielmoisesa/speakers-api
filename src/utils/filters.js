const filterTalkersByQuery = (talkers, query) =>
  talkers.filter((talker) => talker.name.toLowerCase().includes(query.toLowerCase()));

const filterTalkersByRate = (talkers, rate) =>
  talkers.filter((talker) => talker.talk.rate === Number(rate));

module.exports = {
  filterTalkersByQuery,
  filterTalkersByRate,
};
