const connection = require('./connection');

const findAll = () => connection.execute('SELECT * FROM talkers');

module.exports = { findAll };