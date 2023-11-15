const { isDateFormatValid } = require('../utils');

const validateRequiredFields = (fields, requestBody) => {
  const missingField = fields.find((field) => !(field in requestBody));
  return missingField ? `O campo "${missingField}" é obrigatório` : true;
};

const isTalkValid = (talk) => {
  const { watchedAt, rate } = talk;
  if (!isDateFormatValid(watchedAt)) return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return 'O campo "rate" deve ser um número inteiro entre 1 e 5';
  }
  return true;
};

const ageValidation = (age) => {
  if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
    return 'O campo "age" deve ser um número inteiro igual ou maior que 18';
  }
  return true;
};

const validateFieldsRules = (requestBody) => {
  const { name, age, talk } = requestBody;
  const talkValidation = isTalkValid(talk);
  const ageValidationResult = ageValidation(age);

  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  if (ageValidationResult !== true) return ageValidationResult;
  if (talkValidation !== true) return talkValidation;

  return true;
};

const validateRate = (rate) => {
  if (!(rate >= 1 && rate <= 5) || typeof rate !== 'number' || !Number.isInteger(rate)) {
    return 'O campo "rate" deve ser um número inteiro entre 1 e 5';
  }
  return true;
};

module.exports = { validateRequiredFields, validateFieldsRules, validateRate };