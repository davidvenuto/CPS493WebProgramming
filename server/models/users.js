/* B"H
*/
const fs = require('fs/promises');

const fileName = __dirname + '/../data/users.json';

/** @type { { items: User[] } } */
let data //= require('../data/users.json');

fs
    .access(fileName, fs.constants.F_OK)
    .then(() => fs.readFile(fileName, 'utf8'))
    .then(content => {
        data = JSON.parse(content);
    }).catch(err => {console.error(err); })


function save() {
    return fs.writeFile(fileName, JSON.stringify(data, null, 2))
}

/**
 * @typedef {import('../../client/src/model/users').User} User
 * */

/**
 * @returns {User[]}
 * */
function getAll() {
    return data.items.map(x=> ({
        ...x, password: undefined, bank: undefined, ssn: undefined,
    }))
}

/**
 * @param {number} id
 * @returns {User}
 * */
function get(id) {
    return data.items.find(item => item.id == id);
}

/**
 * @param {string} q
 * @returns {User[]}
 * */
function search(q) {
    return getAll().filter(item => 
        new RegExp(q, 'i').test(item.firstName) ||
        new RegExp(q, 'i').test(item.lastName) ||
        new RegExp(q, 'i').test(item.email) );
}

/**
 * @param {User} user
 * @returns {User}
 * */
function add(user) {
    user.id = data.items.length + 1;
    data.items.push(user);
    console.log("2: About to save")
    save()
        .then(() => console.log("3: Saved"))
        .catch(console.error);
    console.log("4: About to return user")
    return user;
}

/**
 * @param {User} user
 * @returns {User}
 * */
function update(user) {
    const index = data.items.findIndex(item => item.id == user.id);
    if (index >= 0) {
        data.items[index] = {
            ...data.items[index],
            ...user
        };
        save().catch(console.error);
        return user;
    }
    return null;
}

/**
 * @param {number} id
 * @returns {User | null}
 * */
function remove(id) {
    const index = data.items.findIndex(item => item.id == id);
    if (index >= 0) {
        const deleted = data.items.splice(index, 1);
        save().catch(console.error);
        return deleted[0];
    }
    return null;
}

module.exports = {
    getAll, get, search, add, update, remove
}