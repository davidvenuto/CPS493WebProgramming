const express = require('express');
const users = require('./controllers/users');
/* B"H
*/

const app = express();
const PORT = 3000;

app
  .use(express.json())

app
  .get('/', (req, res) => {
    res.send('Hello New Paltz!')
  })
  .use('/api/v1/users', users)

// Error handling


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});