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

module.exports = { readTalkers, getTalkerById, writeTalker };