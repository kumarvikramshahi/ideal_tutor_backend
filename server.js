const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const helmet = require('helmet');
// const path = require('path');

const { DATABASE_CONNECTION_STRING } = require('./utils/constants');

const PORT = process.env.PORT || 8080;

const app = express();

// File imports
const { ErrorMiddleware } = require('./common/Errors');
const teacher = require('./routes/Teacher');
const student = require('./routes/Student');
const auth = require('./routes/Auth');

// Parsers and CORS
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    next();
});
// app.use(helmet());
// app.use(morgan('combined'));

// Routes
app.get("/", (req, res) => {
    console.log("getting req.")
    res.status(200).json({
        message: "getting incoming request!"
    });
})
app.use('/auth', auth);
app.use(teacher);
app.use(student);

// Default error handeler
app.use((error, req, resp, next) => ErrorMiddleware(error, req, resp, next))

// Listening
mongoose.connect(
    DATABASE_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => app.listen(PORT))
    .catch(err => console.log(err, "error in connection to DB"))
