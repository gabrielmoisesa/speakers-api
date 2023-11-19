const express = require('express');

const { validateLogin } = require('../middlewares');
const { generateToken } = require('../utils');

const router = express.Router();

router.post('/', validateLogin, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;