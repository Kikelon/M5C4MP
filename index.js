const express = require('express');
const cors = require('cors');
const apiPort = 3000;
const routes = require('./apiRest/apiRestMovies');

// Arrancamos la aplicación de express
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);


// Asignamos el puerto para escuchar peticiones
app.listen(apiPort, function() {
    console.log('Escuchando en el puerto: ' +  apiPort)
   });
