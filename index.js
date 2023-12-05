const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');

const characterRoute = require('./Routes/character');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
dotenv.config();

app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
    })
);

// Route
app.use('/v1', characterRoute);

app.listen(9000, () => {
    console.log('Server is running ...');
});
