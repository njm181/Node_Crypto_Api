const { default: axios } = require("axios");
const { json } = require("express");
const CryptoCoinResponse = require("../models/CryptoCoinResponse");
const DolarEuroResponse = require("../models/DolarEuroResponse");

class CoinService {

    constructor(){}


    createDolarEuroInstance(){
        const instance = axios.create({
            baseURL: 'https://api.bluelytics.com.ar/v2/latest'
        });
        return instance;
    }

    createCryptoCoinInstance(){
        const instance = axios.create({
            baseURL: 'https://api.coincap.io/v2/assets'
        });
        return instance;
    }

    async getCoinsValuesValue(){
        try{
            const dolarEuroInstance = this.createDolarEuroInstance();
            const cryptoCoinsIntance = this.createCryptoCoinInstance();

            const resDolarEuro = await dolarEuroInstance.get();
            const resCryptoCoins = await cryptoCoinsIntance.get();

            const dolarEuroValue = this.sortDolarEuroResults(resDolarEuro.data);
            const crytoCoinsValue = this.sortCoinsResults(resCryptoCoins.data.data);

            const resultsValues = {
                dolarEuroValue: dolarEuroValue,
                crytoCoinsValue: crytoCoinsValue
            };

            return resultsValues;

        }catch(error){
            console.log(error);
            const errorReponse = {
                status: 400,
                message: 'Error al obtener los valores'
            };
            return errorReponse;
        }
    }

    sortCoinsResults(coinList){
        const sortCoinList = coinList.filter(coin =>{ 
           return parseInt(coin.rank, 10) <= 5;
          });
        const coinObjectList = sortCoinList.map(coin => {
            const cryptoCoinsValue = new CryptoCoinResponse(
                coin.rank,
                coin.name,
                coin.priceUsd,
                coin.explorer
            )
            return cryptoCoinsValue;
        })
        console.log('Lista ordenada: '+ JSON.stringify(coinObjectList));
        return coinObjectList;
    }

    sortDolarEuroResults(dolarEuroList){
        const dolaEuroValues = new DolarEuroResponse (
            dolarEuroList.oficial.value_sell,
            dolarEuroList.oficial.value_buy,
            dolarEuroList.blue.value_sell,
            dolarEuroList.blue.value_buy,
            dolarEuroList.oficial_euro.value_sell,
            dolarEuroList.oficial_euro.value_buy,
            dolarEuroList.blue_euro.value_sell,
            dolarEuroList.blue_euro.value_buy
        );
        return dolaEuroValues;
    }
}

module.exports = CoinService