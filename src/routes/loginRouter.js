const express = require('express');

const validate = require('../middlewares/validate');
const { loginController } = require('../controllers');

const router = express.Router();

router.post('/', validate.login, loginController.post);

module.exports = router;