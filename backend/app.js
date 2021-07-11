
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const apiRoutes = require('./api')

const mongoDB = 'mongodb://127.0.0.1/auth';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("DB Connected!")
})
.catch(err => {
    console.log(err);
});


app.use(cors())
app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/auth', apiRoutes);

module.exports = app;