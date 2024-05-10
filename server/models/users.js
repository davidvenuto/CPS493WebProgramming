const fs = require('fs/promises');

const fileName = __dirname + '/../data/users.json';

/** @type { Promise< { items: User[] } > } */
const dataP = fs
        .access(fileName, fs.constants.F_OK)
        .then(() => fs.readFile(fileName, 'utf8'))
        .then(content => JSON.parse(content))


async function save() {
    const data = await dataP;
    return fs.writeFile(fileName, JSON.stringify(data, null, 2));
}

/**
 * @typedef {import('../../client/src/model/users').User} User
 * */

/**
 * @returns {Promise<User[]>}
 * */
async function getAll() {
    const data = await dataP;
    return data.items.map(x=> ({
        ...x, password: undefined, bank: undefined, ssn: undefined,
    }))
}

/**
 * @param {number} id
 * @returns {Promise<User>}
 * */
async function get(id) {
    const data = await dataP;
    return data.items.find(item => item.id == id);
}

/**
 * @param {string} q
 * @returns {Promise<User[]>}
 * */
async function search(q) {
    return (await getAll()).filter(item => 
        new RegExp(q, 'i').test(item.firstName) ||
        new RegExp(q, 'i').test(item.lastName) ||
        new RegExp(q, 'i').test(item.email) );
}

/**
 * @param {User} user
 * @returns {Promise<User>}
 * */
async function add(user) {
    const data = await dataP;
    user.id = data.items.length + 1;
    data.items.push(user);
    console.log("2: About to save");
    
    await save()        
    console.log("3: Saved")

    console.log("4: About to return user");
    return user;
}

/**
 * @param {User} user
 * @returns {Promise<User>}
 * */
async function update(user) {
    const data = await dataP;
    const index = data.items.findIndex(item => item.id == user.id);
    if (index >= 0) {
        data.items[index] = {
            ...data.items[index],
            ...user
        };
        await save()
        return user;
    }
    return null;
}

/**
 * @param {number} id
 * @returns {Promise<User | null>}
 * */
async function remove(id) {
    const data = await dataP;
    const index = data.items.findIndex(item => item.id == id);
    if (index >= 0) {
        const deleted = data.items.splice(index, 1);
        await save()
        return deleted[0];
    }
    return null;
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 * */
async function login(email, password) {
    const data = await dataP;
    const user = data.items.find(item => item.email === email);
    if(!user) throw new Error("Invalid email");
    //if(user.password !== password) throw new Error("Invalid password");

    return user
}

module.exports = {
    getAll, get, search, add, update, remove, login
}