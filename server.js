const app = require('./app.js');
const mongoose = require('mongoose');

require('dotenv').config({path: './.env'});
const port = 3000;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.75c0l.mongodb.net/navy_efroyim?retryWrites=true&w=majority`, (err) => {
    if (err) return console.log(`#\tError. Can not connect database...`)
    console.log(`#\tDatabase connected...`)
});

app.listen(process.env.PORT || port, 'localhost', () => {
    console.log(`#\tListening on ${port}...`)
});