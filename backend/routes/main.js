const router = require('express').Router();
const NW = require('../functions/needleman-wunsch');

router.post('/', (req, res) => {
    var seq1 = JSON.stringify(req.body.data.seq1).slice(1).slice(0, -1).toUpperCase();
    var seq2 = JSON.stringify(req.body.data.seq2).slice(1).slice(0, -1).toUpperCase();

    /*Correções a fazer no algoritmo:
        A mesma célula da matriz tá com dois valores atribuídos a ela;
    */
    var results = NW(seq1, seq2);
    return res.status(200).send(results);
});

module.exports = router;