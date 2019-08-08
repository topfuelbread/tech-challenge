let express = require('express');
let router = express.Router();
let auth = require('../authorization/auth');
let fetch = require('node-fetch');

router.post('/',async (req,resp)=>{
    let email = req.body.email;
    let password = req.body.password;
    let users = await getUsers();
    let user = await users.find((user) => {
        return (user.id == password && user.email == email);
    });
    if (user) {
        let token = auth.generateToken(user);
        resp.cookie('auth_token',token);
        resp.send({
            redirectURL:'/'
        });
    }
    else{
        resp.status(400);
        resp.send('Login Unsuccessful');
    }
})

async function getUsers(){
    return await fetch('https://jsonplaceholder.typicode.com/users/')
        .then(response => response.json())
        //.then(json => console.log(json));
}

module.exports = router;