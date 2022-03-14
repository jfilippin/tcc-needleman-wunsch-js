const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes/main');

require('dotenv').config();

const app = express();
app.use(cors());

app.use('/', mainRouter);

app.listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT)
});

// Cifra de Playfair não cai na prova do Testi