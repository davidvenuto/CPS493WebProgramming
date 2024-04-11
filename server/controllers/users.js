const users = require('../models/users')
const express = require('express');
const app = express.Router();

/*
    Ways that we send information to the server:
    1. Path parameters
    2. Query parameters
    3. Body
    4. Headers
*/

/** 
 * @typedef {import('../../client/src/model/users').User} User 
 * @typedef {import('../../client/src/model/transportTypes').DataEnvelope<User> } UserDataEnvelope
 * @typedef {import('../../client/src/model/transportTypes').DataListEnvelope<User> } UserDataListEnvelope
 * */

app
    .get('/', (req, res, next) => {
        const all = users.getAll();
        /** @type { UserDataListEnvelope } */
        const response = {
            data: all,
            totalCount: all.length,
            isSuccess: true,
        }
        res.send(response);
        
    })
    .get('/search', (req, res, next) => {

        const search = req.query.q;
        if(typeof search !== 'string' ) throw new Error('search is required');
        const result = users.search(search);
        /** @type { UserDataListEnvelope } */
        const response = {
            data: result,
            totalCount: result.length,
            isSuccess: true,
        }
        res.send(response);

    })
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        /** @type { UserDataEnvelope } */
        const response = {
            data: users.get(+id),
            isSuccess: true,
        }
        res.send(response);
    })
    .post('/', (req, res, next) => {
        const user = req.body;
        console.log("1: About to add user");
        const result = users.add(user);

        /** @type { UserDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }
        
        res.send(response);
    })
    .patch('/:id', (req, res, next) => {
        const user = req.body;
        user.id = req.params.id;
        const result = users.update(user);

        /** @type { UserDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }
        
        res.send(response);
    })
    .delete('/:id', (req, res, next) => {
        const id = req.params.id;
        const result = users.remove(+id);

        
        /** @type { UserDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }
        
        res.send(response);
    })




module.exports = app