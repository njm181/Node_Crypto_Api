const { response } = require("express");
const CoinService = require("../../services/coin.service");

const getLastestDolarValue = async ( req, res = response) => {
    const coinService = new CoinService();
    const coinValues = await coinService.getCoinsValuesValue();

    if(coinValues.status != undefined){
        res.status(400);
    }

    res.json({
        message: 'Consulta realizada',
        values: coinValues
    });
}

module.exports = {
    getLastestDolarValue
}