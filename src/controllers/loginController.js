const { generateToken } = require('../utils');

const post = async (_req, res) => res.status(200).json({ token: generateToken() });

module.exports = { post };