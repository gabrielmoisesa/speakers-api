const express = require('express');
const { validateLogin } = require('./middlewares');
const { generateToken } = require('./utils/utils');
const talkerRouter = require('./routes/talkerRouter');

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

// Routes
app.use('/talker', talkerRouter);

app.post('/login', validateLogin, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

// Error middleware
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: `error: ${err.message}` });
});
