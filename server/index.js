const express = require('express');
const users = require('./controllers/users');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello New Paltz!')
})
.use('/api/v1/users', users)


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});