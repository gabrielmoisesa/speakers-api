const { fsUtils } = require('../db');
const { isEmailValid, isDateFormatValid } = require('../utils');
const {
  validateRequiredFields,
  validateFieldsRules,
  validateRate,
  invalidRateMessage,
} = require('../utils/validateUtils');

const id = async (req, res, next) => {
  const talkerById = await fsUtils.getTalkerById(req.params.id);
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  next();
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmailValid(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const talker = (req, res, next) => {
  const requiredValidation = validateRequiredFields(['name', 'age', 'talk'], req.body);
  if (requiredValidation !== true) return res.status(400).json({ message: requiredValidation });

  const requiredTalkValidation = validateRequiredFields(['watchedAt', 'rate'], req.body.talk);
  if (requiredTalkValidation !== true) {
    return res.status(400).json({ message: requiredTalkValidation });
  }

  const rulesValidation = validateFieldsRules(req.body);
  if (rulesValidation !== true) return res.status(400).json({ message: rulesValidation });

  next();
};

const search = (req, res, next) => {
  const { rate, date } = req.query;

  if (rate && !validateRate(rate)) {
    return res.status(400)
      .json({ message: invalidRateMessage });
  }

  if (date && !isDateFormatValid(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};

const ratePatch = (req, res, next) => {
  const { rate } = req.body;
  const requiredValidation = validateRequiredFields(['rate'], req.body);

  if (requiredValidation !== true) return res.status(400).json({ message: requiredValidation }); 

  if (!validateRate(rate)) return res.status(400).json({ message: invalidRateMessage });
  
  next();
};

module.exports = {
  login,
  talker,
  id,
  search,
  ratePatch,
};