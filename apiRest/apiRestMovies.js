const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var router = express.Router();
const Movie = require('../schema/movieSchema');
const Professional = require('../schema/professionalSchema');


// CONEXIÓN A LA BASE DE DATOS DE MONGO
const mongoDB = 'mongodb://localhost:27017/IMDB';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log('Conexión establecida con éxito'))
.catch((err) => console.log(err)); 

// PROFESSIONALS 

// GET /professionals - Obtiene toda la colección de profesionales
router.route('/professionals')
    .get(function (req, res) {
        Professional.find({})
            .then((professional) => {
                if (professional == null) {
                    console.log("No se han encontrado ningún documentos en la colección");
                    res.status(404).send("No se han encontrado ningún documentos en la colección");
                } else {
                    console.log(professional) 
                    res.send(professional);
                };
         })
            .catch((err) => {
                console.log("Petó el GET /professionals\n" + err);
                res.status(422).send(err.message);
            });
    })
    // POST /professionals - Añade un nuevo profesional a la colección de profesionales
    .post(function (req, res) {
        console.log(req.body);
        Professional.create(req.body)
            .then((professional) => {
                console.log("Documento añadido a la colección")
                res.send(professional);
            })
            .catch((err) => {
                console.log("Petó el POST /professionals\n" + err);
                res.status(422).send(err.message);
            });
        let message = 'POST /professionals - Añade un nuevo profesional';
    })    // PUT /professionals - Modifica los datos de un profesional de la colección
    .put(function (req, res) {
        console.log(req.body);
        Professional.findByIdAndUpdate({_id : req.body.id}, req.body)
            .then((professional) => {
                console.log(professional);
                if (professional.length == 0) { res.status(404).send(professional) } else { res.send(professional) };
            })
            .catch((err) => {
                console.log("Petó el PUT /professionals\n" + err);
                res.status(422).send(err.message);
            });
    })
    // DEL /professionals - Elimina un profesional de la colección
    .delete(function (req, res) {
        Professional.deleteOne({_id : req.body.id})
            .then((professional) => {
                console.log(professional);
                if (professional.length == 0) { res.status(404).send(professional) } else { res.send(professional) };
            })
            .catch((err) => {
                console.log("Petó el DEL /professionals\n" + err);
                res.status(422).send(err.message);
            });
    });

// GET /professionals:id Obtiene los datos del profesional con el id pasado por parámetro
router.route('/professionals/:id')
    .get(function (req, res) {
        id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // No tenemos un ObjectId válido.
            console.log("El ObjectId no es válido");
            res.status(422).send("El ObjectId no es válido");
        } else {
            Professional.findById(id)
                .then((professional) => {
                    if (professional == null) {
                        console.log("No se ha encontrado ningún documento con el id\"" + id + "\"");
                        res.status(404).send("No se ha encontrado ningún documento con el id\"" + id + "\"");
                    } else {
                        console.log(professional) 
                        res.send(professional);
                    };
                })
                .catch((err) => {
                    console.log("Petó el GET /professionals/:id\n" + err);
                    res.status(422).send(err.message);
                });
        }
    });
 


// MOVIES

router.route('/movies')
    // GET /movies - Obtiene toda la colección de películas
    .get(function (req, res) {
        Movie.find({})
            .then((movie) => {
                console.log(movie);
                if (movie.length == 0) { 
                    res.status(404).send(movie) 
                } else { 
                    res.send(movie) 
                };
            })
            .catch((err) => {
                console.log("Petó el GET /movies\n" + err);
                res.status(422).send(err.message);
            });
    })
    // POST /movies - Añade una nueva película la colección de películas
    .post(function (req, res) {
        let message = 'POST /movies - Añade una nueva película la colección de películas';
        console.log(message);
        res.send(message);
    })    
    // DEL /movies - Elimina una película de la colección
    .delete(function (req, res) {
        Movie.deleteOne({_id : req.body.id})
            .then((movie) => {
                console.log(movie);
                if (movie.length == 0) { res.status(404).send(movie) } else { res.send(movie) };
            })
            .catch((err) => {
                console.log("Petó el DEL /movies\n" + err);
                res.status(422).send(err.message);
            });    });

router.route('/movies/:id')
    // GET /movies:id - Obtiene los datos de la película con el id pasado por parámetro
    .get(function (req, res) {
        id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // No tenemos un ObjectId válido.
            console.log("El ObjectId no es válido");
            res.status(422).send("El ObjectId no es válido");
        } else {
            Movie.findById(id)
                .populate('actors directors writers', 'name')
                .then((movie) => {
                    if (movie == null) {
                        console.log("No se ha encontrado ningún documento con el id\"" + id + "\"");
                        res.status(404).send("No se ha encontrado ningún documento con el id\"" + id + "\"");
                    } else {
                        console.log(movie); 
                        res.send(movie);
                    };
                })
                .catch((err) => {
                    console.log("Petó el GET /movies:id\n" + err);
                    res.status(422).send(err.message);
                });
        }
    })
    // PUT /movies/:id - Modifica los datos de una película de la colección
    .put(function (req, res) {
        let message = 'PUT /movies/:id - Modifica los datos de una película de la colección';
        console.log(message);
        res.send(message);
    })
; 
  
router.route('/movies/actor/:idMovie')
    // GET /movies/actor/:idMovie Obtiene los actores de la película
    .get(function (req, res) {
        let message = 'GET /movies/actor/:idMovie Obtiene los actores de la película';
        console.log(message);
        res.send(message);
    })
    // POST /movies/actor/:idMovie - Añade un nuevo actor a la película
    .post(function (req, res) {
        let message = ' POST /movies/actor/:idMovie - Añade un nuevo actor a la película';
        console.log(message);
        res.send(message);
    })
    // DEL /movies/actor/:idMovie - Elimina un actor de la película
    .delete(function (req, res) {
        let message = ' POST /movies/actor/:idMovie - Añade un nuevo actor a la película';
        console.log(message);
        res.send(message);
    });

router.route('/movies/director/:idMovie')
    // GET /movies/director:idMovie Obtiene los directores de la película
    .get(function (req, res) {
        let message = 'GET /director/actor:idMovie Obtiene los directores de la película';
        console.log(message);
        res.send(message);
    })
    // POST /movies/director/:idMovie Añade un nuevo director a la película
    .post(function (req, res) {
        let message = 'POST /movies/director/:idMovie Obtiene los director a la película';
        console.log(message);
        res.send(message);
    })
    // DEL /movies/director/:idMovie Elimina un director de la película
    .delete(function (req, res) {
        let message = 'DEL /movies/director/:idMovie Elimina un director de la película';
        console.log(message);
        res.send(message);
    });

router.route('/movies/guionista/:idMovie')
    // GET /movies/guionista:idMovie Obtiene los guionistas de la película
    .get(function (req, res) {
        let message = 'GET /movies/guionista:idMovie Obtiene los guionistas de la película';
        console.log(message);
        res.send(message);
    // POST /movies/guionista:idMovie Añade un nuevo guionista a la película
    })
    .post(function (req, res) {
        let message = 'POST /movies/guionista/:idMovie Añade un nuevo guionista a la película';
        console.log(message);
        res.send(message);
    })
    // DEL /movies/guionista/:idMovie Elimina un guionista de la película
    .delete(function (req, res) {
        let message = 'DEL /movies/guionista/:idMovie Elimina un guionista de la película';
        console.log(message);
        res.send(message);
    });

router.route('/movies/productora/:idMovie')
    // GET /movies/guionista:idMovie Obtiene la productora de la película
    .get(function (req, res) {
        let message = 'GET /movies/productora/:idMovie Obtiene la productora de la película';
        console.log(message);
        res.send(message);
    // POST /movies/guionista:idMovie Modifica la productora de la película
    })
    .post(function (req, res) {
        let message = 'POST /movies/productora/:idMovie Modifica la productora de la película';
        console.log(message);
        res.send(message);
    })
    // DEL /movies/guionista/:idMovie Elimina la productora de la película
    .delete(function (req, res) {
        let message = 'DEL /movies/productora/:idMovie Elimina la productora de la película';
        console.log(message);
        res.send(message);
    });

module.exports = router;