const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

const readTalkers = async () => {
  try {
    const content = await fs.readFile(talkersPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.log(`readFile error: ${error.message}`);
  }
};

const getTalkerById = async (id) => {
  try {
    const talkers = await readTalkers();
    return talkers.find((talker) => talker.id === Number(id));
  } catch (error) {
    console.log(`getTalkerById error: ${error.message}`);
  }
};

const getTalkersByQuery = async (query) => {
  try {
    const talkers = await readTalkers();
    if (!query) return talkers;
    return talkers.filter((talker) => ((talker.name).toLowerCase()).includes(query.toLowerCase()));
  } catch (error) {
    console.log(`getTalkerByQuery error: ${error.message}`);
  }
};

const writeTalker = async (newTalker) => {
  try {    
    const talkers = await readTalkers();
    let newId = talkers.length + 1;

    talkers.forEach((talker) => {
      if (talker.id === newId) newId += 1;
    });

    const { name, age, talk } = newTalker;
    const newTalkerWithId = { name, age, id: newId, talk };
    talkers.push(newTalkerWithId);

    await fs.writeFile(talkersPath, JSON.stringify(talkers, null, 2));
  } catch (error) {
    console.log(`writeTalker error: ${error.message}`);
  }
};

const updateTalker = async (id, updatedTalker) => {
  try {
    const talkers = await readTalkers();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

    if (talkerIndex === -1) return false;

    talkers[talkerIndex] = { ...talkers[talkerIndex], ...updatedTalker };

    await fs.writeFile(talkersPath, JSON.stringify(talkers, null, 2));
  } catch (error) {
    console.log(`updateTalker error: ${error.message}`);
  }
};

const deleteTalker = async (id) => {
  try {
    const talkers = await readTalkers();
    const deletedTalker = talkers.filter((talker) => talker.id !== Number(id));
    await fs.writeFile(talkersPath, JSON.stringify(deletedTalker, null, 2));
  } catch (error) {
    console.log(`deleteTalker error: ${error.message}`);
  }
};

module.exports = {
  readTalkers,
  getTalkerById,
  getTalkersByQuery,
  writeTalker,
  updateTalker,
  deleteTalker,
};