let express = require('express');
let router = express.Router();
let auth = require('../authorization/auth').checkAuth;
let fetch = require('node-fetch');
let jwt = require('jsonwebtoken');

async function getAlbums(){
    return await fetch('https://jsonplaceholder.typicode.com/albums/')
        .then(response => response.json())
}

router.get('/', auth, async (req, resp) => {
    let allAlbums = await getAlbums();
    let id = jwt.verify(req.cookies['auth_token'], 'junejune').password;
    console.log(id);
    let albums = [];
    allAlbums.forEach(album => {
        if (album.userId == id)
            albums.push(album);
    });
    resp.send(albums);
})

router.get('/:id', auth, async (req,resp)=>{
    let id = req.params.id;
    let allAlbums = await getAlbums();
    let album = allAlbums.find((album) => {
        return album.id == id;
    });
    resp.send(album); 
})

module.exports = router;