const { getTalkerById } = require('./utils/fsUtils');
const { isEmailValid, isDateFormatValid } = require('./utils');
const {
  validateRequiredFields,
  validateFieldsRules,
  validateRate,
  invalidRateMessage,
} = require('./validation/talkerValidation');

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  next();
};

const validateLogin = (req, res, next) => {
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

const validateTalker = (req, res, next) => {
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

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  if (typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido: precisa ser uma string' });
  } 
  next();
};

const validateSearch = (req, res, next) => {
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

const validateRatePatch = (req, res, next) => {
  const { rate } = req.body;
  const requiredValidation = validateRequiredFields(['rate'], req.body);

  if (requiredValidation !== true) return res.status(400).json({ message: requiredValidation }); 

  if (!validateRate(rate)) return res.status(400).json({ message: invalidRateMessage });
  
  next();
};

module.exports = {
  validateLogin,
  validateTalker,
  validateToken,
  validateId,
  validateSearch,
  validateRatePatch,
};