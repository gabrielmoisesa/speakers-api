const express = require('express');
const { readFile, getTalkerById } = require('./utils/fsUtils');
const { validateLogin } = require('./middlewares');
const { generateToken } = require('./utils/utils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  if (!talkers) return res.status(200).json([]);
  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(id);
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkerById);
});

app.post('/login', validateLogin, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

// Error middleware
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: `error: ${err.message}` });
});
