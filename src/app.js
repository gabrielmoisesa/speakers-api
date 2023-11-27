const express = require('express');
const { talkerRouter, loginRouter } = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/talker', talkerRouter);
app.use('/login', loginRouter);
app.use(errorHandler);

module.exports = app;