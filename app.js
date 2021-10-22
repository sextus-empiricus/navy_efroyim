const express = require('express');
const userRouter = require('./routes/userRouter.js');
const messagesRouter = require('./routes/messagesRouter.js');
const errorGlobalHandler = require('./controllers/errorController.js');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messagesRouter);

app.use(errorGlobalHandler);

module.exports = app;