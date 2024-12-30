const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const characterRoute = require('./Routes/character');

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
    })
);

app.use('/v1', characterRoute);

app.listen(9000, () => {
    console.log('Server is running ...');
});
