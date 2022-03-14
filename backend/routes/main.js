const router = require('express').Router();

router.post('/', (req, res) => {
    console.log(req.body);
    console.log(res.send("ok"));

    return res.send("ok");
});

module.exports = router;