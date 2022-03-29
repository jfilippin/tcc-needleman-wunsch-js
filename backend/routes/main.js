const router = require('express').Router();

router.post('/', (req, res) => {
    var seq1 = JSON.stringify(req.body.data.seq1);
    var seq2 = JSON.stringify(req.body.data.seq2);
    
    console.log("Sequence 1: " + seq1);
    console.log("Sequence 2: " + seq2);

    res.status("200");
    return res.send("ok");
});

module.exports = router;