const express = require('express');
const userRouter = require('./routes/userRouter.js');
const messagesRouter = require('./routes/messagesRouter.js');
const errorGlobalHandler = require('./controllers/errorController.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messagesRouter);

app.use(errorGlobalHandler);

module.exports = app;