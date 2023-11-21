const app = require('./app');
const connection = require('./db/connection');

const PORT = process.env.PORT || '3001';

app.listen(PORT, async () => {
  console.log(`Online on port ${PORT}`);

  const [result] = await connection.execute('SELECT 1');
  if (result) console.log('MySQL connection OK');
});