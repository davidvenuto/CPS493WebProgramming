const model = require('../models/products')
const express = require('express');
const app = express.Router();

/** 
 * @typedef {import('../../client/src/model/products').Product} Product 
 * @typedef {import('../../client/src/model/transportTypes').DataEnvelope<Product> } ProductDataEnvelope
 * @typedef {import('../../client/src/model/transportTypes').DataListEnvelope<Product> } ProductDataListEnvelope
 * */

app
    .get('/', (req, res, next) => {
        model.getAll()
        .then(all => {
            /** @type { ProductDataListEnvelope } */
            const response = {
                data: all,
                totalCount: all.length,
                isSuccess: true,
            }
            res.send(response);
        }).catch(next);
        
    })
    .get('/search', (req, res, next) => {

        const search = req.query.q;
        if(typeof search !== 'string' ) throw new Error('search is required');
        model.search(search)
        .then(result => {
            /** @type { ProductDataListEnvelope } */
            const response = {
                data: result,
                totalCount: result.length,
                isSuccess: true,
            }
            res.send(response);
        }).catch(next);
    })
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        model.get(id)
        .then(result => {
            /** @type { ProductDataEnvelope } */
            const response = {
                data: result,
                isSuccess: true,
            }
            res.send(response);
        }).catch(next);
    })
    .post('/', (req, res, next) => {
        const product = req.body;

        model.add(product)
        .then(result => {
            /** @type { ProductDataEnvelope } */
            const response = {
                data: result,
                isSuccess: true,
            }
            res.send(response);
        }).catch(next);
    })
    .patch('/:id', (req, res, next) => {
        const product = req.body;
        product.id = req.params.id;
        model.update(product)
        .then(result => {
            /** @type { ProductDataEnvelope } */
            const response = {
                data: result,
                isSuccess: true,
            }

            res.send(response);
        }).catch(next);
    })
    .delete('/:id', (req, res, next) => {
        const id = req.params.id;
        model.remove(+id)
        .then(result => {
            /** @type { ProductDataEnvelope } */
            const response = {
                data: result,
                isSuccess: true,
            }
            res.send(response);
        }).catch(next);
    })




module.exports = app