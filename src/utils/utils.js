const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 16;
  let token = '';

  for (let i = 0; i < tokenLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateRequiredFields = (fields, requestBody) => {
  const missingField = fields.find((field) => !(field in requestBody));
  return missingField ? `O campo "${missingField}" é obrigatório` : true;
};

const isValidDateFormat = (date) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return dateRegex.test(date);
};

const isTalkValid = (talk) => {
  const { watchedAt, rate } = talk;
  if (!isValidDateFormat(watchedAt)) return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
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

module.exports = {
  generateToken,
  validateEmail,
  validateRequiredFields,
  validateFieldsRules,
};