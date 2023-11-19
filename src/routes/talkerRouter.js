const express = require('express');

const {
  validateTalker,
  validateToken,
  validateId,
  validateSearch,
  validateRatePatch,
} = require('../middlewares');

const controller = require('../controllers/talkerController');

const router = express.Router();

router.get('/', controller.get);

router.get('/search', validateToken, validateSearch, controller.getSearch);

router.get('/db', controller.getDb);

router.get('/:id', validateId, controller.getId);

router.post('/', validateToken, validateTalker, controller.post);

router.put('/:id', validateToken, validateId, validateTalker, controller.putId);

router.patch('/rate/:id', validateToken, validateId, validateRatePatch, controller.patchRate);

router.delete('/:id', validateToken, validateId, controller.deleteById);

module.exports = router;