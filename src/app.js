const express = require('express');
const { talkerRouter, loginRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: `error: ${err.message}` });
});

module.exports = app;