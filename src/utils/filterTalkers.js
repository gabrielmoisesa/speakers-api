const byQuery = (talkers, query) =>
  talkers.filter((talker) => talker.name.toLowerCase().includes(query.toLowerCase()));

const byRate = (talkers, rate) =>
  talkers.filter((talker) => talker.talk.rate === Number(rate));

const byDate = (talkers, date) =>
  talkers.filter((talker) => talker.talk.watchedAt === date);

module.exports = {
  byQuery,
  byRate,
  byDate,
};
