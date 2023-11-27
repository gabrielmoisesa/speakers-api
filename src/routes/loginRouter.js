const express = require('express');

const validate = require('../middlewares/validate');
const { generateToken } = require('../utils');

const router = express.Router();

router.post('/', validate.login, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;