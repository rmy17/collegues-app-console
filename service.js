var request = require('request');


function rechercherColleguesParNom(nomRecherche, callback) {

    request(`https://remvia-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true }, function(err, res, body) {

        var temp = body;
        tableauColleguesTrouves = [];
        
        temp.forEach(element => {
        rechercherColleguesParMatricule(element,(colleguesTrouves) => {
            tableauColleguesTrouves.push(colleguesTrouves);
            callback(tableauColleguesTrouves);
            })
        });
    });

    // à noter que la fonction ne retourne rien ici
}


function rechercherColleguesParMatricule(matricule,callback) {
    
    request("https://remvia-collegues-api.herokuapp.com/collegues/"+`${matricule}`, { json: true }, function(err, res, body) {

        var ColleguesTrouves = body;
        callback(ColleguesTrouves);
    });

    // à noter que la fonction ne retourne rien ici
}

exports.test = rechercherColleguesParNom;