const express = require('express');
const users = require('./controllers/users');
/* B"H

Four types of Asynchronous code:
    1. Node Style Callbacks
    2. Pipelining
    3. Promises
    4. Async/Await

*/

/**  
 * @typedef {import('../client/src/model/transportTypes').DataEnvelope<null> } ErrorDataEnvelope
 * */


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
app.use((err, req, res, next) => {
  console.error(err);
  /** @type {ErrorDataEnvelope } */
  const results = { 
    isSuccess: false,
    message: err.message || 'Internal Server Error',
    data: null,
   };
  res.status(500).send(results);
})


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});