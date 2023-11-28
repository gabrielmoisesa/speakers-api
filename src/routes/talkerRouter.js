const express = require('express');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const { talkerController } = require('../controllers');

const controller = talkerController;

const router = express.Router();

router.get('/', controller.get);

router.get('/search', auth.token, validate.search, controller.getSearch);

router.get('/db', controller.getDb);

router.get('/:id', validate.id, controller.getId);

router.post('/', auth.token, validate.talker, controller.post);

router.put('/:id', auth.token, validate.id, validate.talker, controller.putId);

router.patch('/rate/:id', auth.token, validate.id, validate.ratePatch, controller.patchRate);

router.delete('/:id', auth.token, validate.id, controller.deleteById);

module.exports = router;