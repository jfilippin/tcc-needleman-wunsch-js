const router = require('express').Router();
const NW = require('../functions/needleman-wunsch');

router.post('/', (req, res) => {
    var seq1 = JSON.stringify(req.body.data.seq1).slice(1).slice(0, -1);
    var seq2 = JSON.stringify(req.body.data.seq2).slice(1).slice(0, -1);
    
    console.log(NW(seq1, seq2));

    res.status("200");
    return res.send("ok");
});

module.exports = router;