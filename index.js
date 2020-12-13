const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dbConfig = require('./config/database.config.js');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Creación de la aplicación a partir de express
const app = express();

//Configuración del servidor
app.use(bodyParser.urlencoded({extended: true}));

//Formato de las solicitudes que atendera
app.use(bodyParser.json());

//Activa el consumo de dominio cruzado
app.use(cors());

//Conexión a base de datos
// Connect to the database
mongoose.connect(dbConfig.url, dbConfig.options).then(() => {
    console.log("Connect to database: success!");
}).catch(err => {
    console.log('Connect to database: failure!');
    process.exit();
});


//Definición del puerto de escucha
var port = process.env.PORT || 3000;

//Definición de rutas
app.get('/', (req,res) => {
    res.json({
        "message": "main api rest"
    })
});

//Rutas establecidas para product
require('./app/routes/product.routes.js')(app);

//Escucha de puerto para atención de solicitudes
app.listen(port, ()=>{
    console.log("Server listing port: " + port);
})