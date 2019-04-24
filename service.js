var request = require('request');


function rechercherColleguesParNom(nomRecherche, callback, callbackKo) {

    request(`https://remvia-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true }, function(err, res, body) {
        if (err){
            callbackKo("Connection server failed");
        }else if (res.statusCode >= 400 && res.statusCode <= 499){
            callbackKo('Erreur dans les informations de la requete');
        }else if (res.statusCode <= 500 && res.statusCode <= 599){
            callbackKo("Erreur coté serveur");
        }
        else{
            callbackKo("Erreur non attendu");
        }
        var tabMatricule = body;
        tableauColleguesTrouves = [];
        var cpt = tabMatricule.length;//2 matricule
        tabMatricule.forEach(matricule => {
        rechercherColleguesParMatricule(matricule,(colleguesTrouves) => {
            cpt--; //premier passage 1 //second passage 0
            tableauColleguesTrouves.push(colleguesTrouves);
            if (cpt===0){
                callback(tableauColleguesTrouves);
            }
            });
        });
        
    });

    // à noter que la fonction ne retourne rien ici
}


function rechercherColleguesParMatricule(matricule,callback) {
    
    request(`https://remvia-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true }, function(err, res, body) {

        var colleguesTrouves = body;
        callback(colleguesTrouves);
    });

    // à noter que la fonction ne retourne rien ici
}


function creerUnCollegue(collegue,callback,callbackKo){

   
    request({
        url : "https://remvia-collegues-api.herokuapp.com/collegues",
        method : 'POST',
        json : true,
        body : collegue 
    }, function(err,res,body){
        if(err){
            callbackKo("Connection server failed");
        }else if (res.statusCode >= 400 && res.statusCode <= 499){
            callbackKo('Erreur dans les informations de la requete');
        }else if (res.statusCode <= 500 && res.statusCode <= 599){
            callbackKo("Erreur coté serveur");
        }
        else{
            callbackKo("Erreur non attendu");
        }
        
        var collegureCree = body;
        callback(collegureCree);
       
    });
}

function modifierEmail(matricule, collegueAModifier, callback, callbackKo){
    resquest({
        url : `https://remvia-collegues-api.herokuapp.com/collegues/${matricule}`,
        method : 'PATCH',
        json : true,
        body : collegueAModifier
    },function(err,res,body){
        if(err){
            callbackKo("Connection server failed");
        }else if (res.statusCode >= 400 && res.statusCode <= 499){
            callbackKo('Erreur dans les informations de la requete');
        }else if (res.statusCode <= 500 && res.statusCode <= 599){
            callbackKo("Erreur coté serveur");
        }
        else{
            callbackKo("Erreur non attendu");
        }
        
        var collegureCree = body;
        callback(collegureCree);
       
    });
}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.creerCollegue = creerUnCollegue;
exports.modifierEmail = modifierEmail;
//exports.modifierUrl = modifierUrl;


//var request = require("request-promise-native")