let express = require('express');
let router = express.Router();
let auth = require('../authorization/auth').checkAuth;
let fetch = require('node-fetch');
let jwt = require('jsonwebtoken');

async function getPhotos(){
    return await fetch('https://jsonplaceholder.typicode.com/photos/')
        .then(response => response.json())
}

async function getAlbums(){
    return await fetch('https://jsonplaceholder.typicode.com/albums/')
        .then(response => response.json())
}

router.get('/', auth, async (req, resp) => {
    let allAlbums = await getAlbums();
    let id = jwt.verify(req.cookies['auth_token'], 'junejune').password;
    let albumsId = [];
    allAlbums.forEach(album => {
        if (album.userId == id)
            albumsId.push(album.id);
    });
    console.log(albumsId);
    let allPhotos = await getPhotos();
    let photos = [];
    allPhotos.forEach(photo => {
        albumsId.forEach(albumId => {
            if (photo.albumId == albumId){
                photos.push(photo);
            }
        })
    });
    resp.send(photos);
})

router.get('/:id', auth, async (req,resp)=>{
    let id = req.params.id;
    let allPhotos = await getPhotos();
    let photo = allPhotos.find((photo) => {
        return photo.id == id;
    });
    resp.send(photo); 
})

module.exports = router;