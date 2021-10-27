const {join} = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');

const hbsHelpers = require('./utils/hbsHelpers.js');
const errorGlobalHandler = require('./controllers/errorController.js');
const userRouter = require('./routes/userRouter.js');
const messagesRouter = require('./routes/messagesRouter.js');
const viewRouter = require('./routes/viewRotuer.js');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true} ))
app.use(express.static(join(__dirname, 'public')));

app.engine('.hbs', hbs({
    extname: '.hbs',
    helpers: hbsHelpers
}));

app.set('view engine', '.hbs');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messagesRouter);

app.use('/', viewRouter);

app.use(errorGlobalHandler);

module.exports = app;