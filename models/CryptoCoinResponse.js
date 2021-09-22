class CryptoCoinResponse{

    constructor(rank, name, priceUsd, explorer){
        this.rank = rank;
        this.name = name;
        this.priceUsd = priceUsd;
        this.explorer = explorer;
    }
}

module.exports = CryptoCoinResponse