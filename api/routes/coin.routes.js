const { Router } = require("express");
const { getLastestDolarValue } = require("../controller/coin.controller");

const router = Router();

router.get('/', getLastestDolarValue);

module.exports = router;