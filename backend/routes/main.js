const router = require('express').Router();

router.post('/', (req, res) => {
    console.log("Cheguei aqui: " + JSON.stringify(req.body.data));

    res.status("200");
    return res.send("ok");
});

module.exports = router;