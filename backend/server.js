const express = require('express');
const cors = require('cors');

const mainRouter = require('./routes/main');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', mainRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
