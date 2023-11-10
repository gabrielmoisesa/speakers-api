const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, './talker.json');

const readFile = async () => {
  try {
    const content = await fs.readFile(talkersPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.log(`readFile error: ${error.message}`);
  }
};

module.exports = { readFile };