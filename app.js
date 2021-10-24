const {join} = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');

const errorGlobalHandler = require('./controllers/errorController.js');
const userRouter = require('./routes/userRouter.js');
const messagesRouter = require('./routes/messagesRouter.js');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messagesRouter);

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/message', (req, res) => {
    res.render('message')
})

app.use(errorGlobalHandler);

module.exports = app;