let jwt = require('jsonwebtoken');

function generateToken(user){
    let payload = {
        email: user.email,
        password: user.id
    }
    return jwt.sign(payload, 'junejune');
}

function checkToken(token){
    return jwt.verify(token, 'junejune');
}

function checkAuth (req, resp, next){
    let token = req.cookies['auth_token'];
    if (token && checkToken(token)){
        next();
    }
    else{
        resp.status(400);
        resp.send ('Not authorized');
    }
}

module.exports = {
    generateToken,
    checkToken,
    checkAuth
};