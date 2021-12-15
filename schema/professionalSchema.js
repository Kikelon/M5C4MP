const mongoose = require('mongoose');

const profession = ["Actor", "Director", "Guionista", "Productor", "Otro"];

const ProfessionalSchema = mongoose.Schema({
    name: { 
        type : String, 
        required : [ true, 'El nombre es necesario.' ]
    },
    age: { 
        type : Number, 
        required : [ true, 'La edad es necesaria.' ]
    },
    genre: { 
        type : String, 
        required : [ true, 'El género es necesario.' ]
    },
    weigth: { 
        type : Number, 
        required : [ true, 'El peso es necesario.' ]
    },
    heigth: { 
        type : Number, 
        required : [ true, 'La altura es necesaria.' ]
    },
    hairColor: { 
        type : String, 
        required : [ true, 'El color de pelo es necesario.' ]
    },
    eyeColor: { 
        type : String, 
        required : [ true, 'El color de ojos es necesario.' ]
    },
    race: { 
        type : String, 
        required : [ true, 'La raza es necesaria.' ]
    },
    isRequired: { 
        type : Boolean, 
        required : [ true, 'Este campo es necesario, auqnue no sé para que vale.']
    },
    nationality: { 
        type : String, 
        required : [ true, 'La nacionalidad es necesaria.' ]
    },
    oscarsNumber: { 
        type : Number, 
        required : [ true, 'El número de Oscar es necesario.' ],
        default : 0
    },
    profession : {
        type : [String],
        required : [ true, 'La profesión es necesaria.' ],
        enum : profession,
        default : "Otro"
    }
});

module.exports = mongoose.model("professional", ProfessionalSchema);
