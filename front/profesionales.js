// import Profesional from '../class/professional';
// let profesional = Professional[];
class Professional{

    constructor(name, age, genre, weigth, heigth, hairColor, eyeColor, race, isRequired, nationality, oscarsNumber, profession){
        this.id = '';
        this.name = name;
        this.age = parseInt(age);
        this.genre = genre;
        this.weigth = parseInt(weigth);
        this.heigth = parseInt(heigth, 10);
        this.hairColor = hairColor;
        this.eyeColor = eyeColor;
        this.race = race;
        this.isRequired = isRequired;
        this.nationality = nationality;
        this.oscarsNumber = parseInt(oscarsNumber);
        this.profession = profession; 
    }
};

// Función para leer los datos de profesional/es
function getProfessional(){
    let id = document.getElementById("idInput").value;
    let url = "http://localhost:3000/professionals"
    if (id !== ''){
            url = url + "/" + id;
    };
    let param = 
    {
        headers: {"Content-type": "application/json; charset= UTF-8"},
        method: "GET"
    };
    console.log(url);
    console.log(param);
    fetch(url, param)
        .then((data) => {
            return data.json();
        })
        .then((res) => { 
            if (res.length > 1) {
                console.log("Array de profesionales");
            } else {
                rellenarProfessional(res);
            };          
        })
        .catch((error) => {
            console.log(error)
        });
};

// Función para crear un nuevo profesional
function postProfessional(){
    let profesion = [];
    (document.getElementById("actorCheck").checked) ? profesion.push("Actor"): false;
    (document.getElementById("directorCheck").checked) ? profesion.push("Director"): false;
    (document.getElementById("guionistaCheck").checked) ? profesion.push("Guionista"): false;
    (document.getElementById("productorCheck").checked) ? profesion.push("Productor"): false;
    (document.getElementById("otroCheck").checked) ? profesion.push("Otro"): false;
    const profesional = new Professional(
                        document.getElementById("nameInput").value,
                        document.getElementById("ageInput").value,
                        document.getElementById("genreInput").value,
                        document.getElementById("weigthInput").value,
                        document.getElementById("heigthInput").value,
                        document.getElementById("hairColorInput").value,
                        document.getElementById("eyeColorInput").value,
                        document.getElementById("raceInput").value,
                        document.getElementById("isRequiredCheck").checked,
                        document.getElementById("nationalityInput").value,
                        document.getElementById("oscarsNumberInput").value,
                        profesion);
    const url = "http://localhost:3000/professionals";
    const param = 
        {
            headers: {"Content-type": "application/json; charset= UTF-8"},
            body: JSON.stringify(profesional),
            method: "POST"
        };
    console.log(url);
    console.log(param);
    fetch(url, param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(res)
    {
        console.log(res)
    })
    .catch(function(err)
    {
        console.log(err)
    })
};

// Función para modificar un profesional
function putProfessional(){
    let profesion = [];
    (document.getElementById("actorCheck").checked) ? profesion.push("Actor"): false;
    (document.getElementById("directorCheck").checked) ? profesion.push("Director"): false;
    (document.getElementById("guionistaCheck").checked) ? profesion.push("Guionista"): false;
    (document.getElementById("productorCheck").checked) ? profesion.push("Productor"): false;
    (document.getElementById("otroCheck").checked) ? profesion.push("Otro"): false;
    let profesional = new Professional(
                        document.getElementById("nameInput").value,
                        document.getElementById("ageInput").value,
                        document.getElementById("genreInput").value,
                        document.getElementById("weigthInput").value,
                        document.getElementById("heigthInput").value,
                        document.getElementById("hairColorInput").value,
                        document.getElementById("eyeColorInput").value,
                        document.getElementById("raceInput").value,
                        document.getElementById("isRequiredCheck").checked,
                        document.getElementById("nationalityInput").value,
                        document.getElementById("oscarsNumberInput").value,
                        profesion);
    profesional.id = document.getElementById("idInput").value;
    console.log(profesional);
    const url = "http://localhost:3000/professionals";
    const param = 
        {
            headers: {"Content-type": "application/json; charset= UTF-8"},
            body: JSON.stringify(profesional),
            method: "PUT"
        };
        console.log(url);
        console.log(param);
        fetch(url, param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(res)
    {
        console.log(res);
    })
    .catch(function(err)
    {
        console.log(err)
    })
};

// Función para borrar un profesional
function deleteProfessional(){
    const id = { "id" : document.getElementById("idInput").value};
    const url = "http://localhost:3000/professionals";
    const param = 
        {
            headers: {"Content-type": "application/json; charset= UTF-8"},
            body: JSON.stringify(id),
            method: "DELETE"
        };
    console.log(url);
    console.log(param);
    fetch(url, param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(res)
    {
        console.log(res);
        (res.deletedCount == 1) ? document.getElementById("formularioPelicula").reset() : console.log('El documento \"' +  + '\" no se ha borrado  de al colección.');
    })
    .catch(function(err)
    {
        console.log(err)
    })
};

// Función para rellenar el formulario con los datos de un profesional
function rellenarProfessional(data){
    document.getElementById("idInput").value = data._id;
    document.getElementById("nameInput").value = data.name;
    document.getElementById("ageInput").value = data.age;
    document.getElementById("genreInput").value = data.genre;
    document.getElementById("weigthInput").value = data.weigth;
    document.getElementById("heigthInput").value = data.heigth;
    document.getElementById("hairColorInput").value = data.hairColor;
    document.getElementById("eyeColorInput").value = data.eyeColor;
    document.getElementById("raceInput").value = data.race;
    document.getElementById("nationalityInput").value = data.nationality;
    document.getElementById("oscarsNumberInput").value = data.oscarsNumber;
    document.getElementById("isRequiredCheck").checked = data.isRequired;
    document.getElementById("actorCheck").checked = data.profession.includes("Actor");
    document.getElementById("directorCheck").checked = data.profession.includes("Director");
    document.getElementById("guionistaCheck").checked = data.profession.includes("Guionista");
    document.getElementById("productorCheck").checked = data.profession.includes("Productor");
    document.getElementById("otroCheck").checked = data.profession.includes("Otro");

    //document.getElementById("profesional1").name = data.name;
}

