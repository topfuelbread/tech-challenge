let express = require('express');
let router = express.Router();
let auth = require('../authorization/auth');
let fetch = require('node-fetch');

async function getUsers(){
    return await fetch('https://jsonplaceholder.typicode.com/users/')
        .then(response => response.json())
        //.then(json => console.log(json));
}

// /users to fetch all users (unauthenticated)
router.get('/', async (req, resp) => {
    let users = await getUsers();
    resp.send(users);
})

module.exports = router;