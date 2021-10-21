const app = require('./app.js');
const mongoose = require('mongoose');
const chalk = require("chalk");

require('dotenv').config({path: './.env'});
const port = process.env.PORT;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.75c0l.mongodb.net/navy_efroyim?retryWrites=true&w=majority`, (err) => {
    if (err) return console.log(chalk.red.inverse(`#\tError. Can not connect database...`))
    console.log(chalk.green.inverse(`#\tDatabase connected...`))
});

app.listen(port, 'localhost', () => {
    console.log(chalk.green.inverse(`#\tListening on ${port}...`))
});