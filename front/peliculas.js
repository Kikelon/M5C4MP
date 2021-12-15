// import {Pelicula} from '../class/pelicula';

function getMovie(){
    let id = document.getElementById("idInput").value;
    let url = "http://localhost:3000/movies"
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
                console.log("Array de películas");
            } else {
                rellenarMovie(res);
            };          
        })
        .catch((error) => {
            console.log(error)
        });
};

function postMovie(){

};

function putMovie(){

};

function deleteMovie(){
    console.log(document.getElementById("idInput").value);
    const id = { "id" : document.getElementById("idInput").value};
    const url = "http://localhost:3000/movies";
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

function rellenarMovie(data){
    console.log(data);
    let actores = "";
    let directores = "";
    let guionistas = "";
    document.getElementById("idInput").value = data._id;
    document.getElementById("titleInput").value = data.title;
    document.getElementById("releaseYearInput").value = data.releaseYear;
    for (let i =0; i < data.actors.length; i++){
        // (i > 0) ? actores = actores + ", " : false;
        // actores = actores + (data.actors[i].name);
        (i > 0) ? document.getElementById("actorsInput").value = document.getElementById("actorsInput").value + ", " : false;
        document.getElementById("actorsInput").value = document.getElementById("actorsInput").value + data.actors[i].name;
    };
    // document.getElementById("actorsInput").value = actores;
    document.getElementById("nacionalityInput").value = data.nacionality;
    for (let i =0; i < data.directors.length; i++){
        (i > 0) ? directores = directores + ", " : false;
        directores = directores + (data.directors[i].name);
    };
    document.getElementById("directorsInput").value = directores;
    for (let i =0; i < data.writers.length; i++){
        (i > 0) ? guionistas = guionistas + ", " : false;
        guionistas = guionistas + (data.writers[i].name);
    };
    document.getElementById("writersInput").value = guionistas;
    document.getElementById("languageInput").value = data.language;
    document.getElementById("isMCUCheck").checked = data.isMCU;
    document.getElementById("mainCharacterNameInput").value = data.mainCharacterName;
    document.getElementById("producerInput").value = data.producer;
    document.getElementById("distributorInput").value = data.distributor;
    document.getElementById("genreInput").checked = data.genre;
}