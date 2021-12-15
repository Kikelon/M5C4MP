const mongoose = require('mongoose');
const genre = ["Acción", "Thriller", "Terror", "Comedia", "Romántica","Otro"];
const MovieSchema = mongoose.Schema({
    title : { 
        type : String, 
        required : [ true, 'El título es necesario' ],
    },
    releaseYear: { 
        type : Number, 
        required : [ true, 'El año de publicación es necesario' ]
    },
    actors : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "professional"
    }],
    nacionality : { 
        type : String, 
        required : [ true, 'El título es necesario' ]
    },
    directors: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "professional"
    }],
    writers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "professional"
    }],
    language: String,
    isMCU: Boolean,
    mainCharacterName: String,
    producer: String,
    distributor: String,
    genre: { 
        type : String, 
        required : [ true, 'El género es necesario' ],
        enum : genre,
        default : "Otro"
    }
});

module.exports = mongoose.model("movie", MovieSchema);
