const express = require('express');

const validate = require('../middlewares/validate');
const controller = require('../controllers/loginController');

const router = express.Router();

router.post('/', validate.login, controller.post);

module.exports = router;