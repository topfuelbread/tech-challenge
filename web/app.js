let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(express.json());

//for authorization
let auth = require('./authorization/auth');

//for cookies
let cookieParser = require('cookie-parser');
app.use(cookieParser());

//routes
let usersRouter = require('./routes/users');
app.use('/users', usersRouter);
let photosRouter = require('./routes/photos');
app.use('/photos', photosRouter);
let albumsRouter = require('./routes/albums');
app.use('/albums', albumsRouter);
let loginRouter = require('./routes/login');
app.use('/login', loginRouter);


//connection to local server
app.listen(3000, ()=>console.log('Connected'));