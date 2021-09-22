const express = require('express');
const cors = require('cors');
require('dotenv').config();

var server = '';
var rootPath = '/api/coin'

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.initPath = rootPath;

        this.initMiddlewares();
        this.routes();
    }

    initMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        //Middware que se carga cuando pasa una solicitud por esta ruta. Para utilizar las request que estan dentro de Routes
       this.app.use(this.initPath, require('../api/routes/coin.routes'));
    }

    listen(){
        server = this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: '+ this.port)
        });
    }
}
module.exports = Server;