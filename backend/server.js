const express = require('express');
const cors = require('cors');

const globalAlignment = require('./routes/global-alignment');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', globalAlignment);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
