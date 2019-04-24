// récupération du module `readline`
var readline = require('readline');
var service = require('./service.js');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var start = () => {
    var str1 = "1. Rechercher un collègue par nom\n";
    var str2 = "2. Créer un collègue\n";
    var str3 = "3. Créer un collègue\n";
    var str99 = "99. Sortir";
    console.log(str1 + str2 + str3 + str99);
    rl.question('Faites un choix ? : ', (saisie) => {
        if (saisie == 1) {
            rl.question('Donner un nom ! : ', (saisieNom) => {
                console.log(`>> Recherche en cours du nom ${saisieNom}`);
                service.rechercherColleguesParNom(saisieNom, (colleguesTrouves) => {
                    // affichage du tableau des collègues trouvés
                    colleguesTrouves.forEach(collegue => {
                        console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.dateDeNaissance} ${collegue.matricule}`);
                    });
                    start();
                }, (messageErr) => {
                    console.log('OOps :', messageErr);
                    start();
                });

            });
        }
        else if (saisie == 2) {
            var collegue = {};

            rl.question("Donner un nom ! : ", (saisieNom) => {
                collegue.nom = saisieNom;
                rl.question("Donner un prenom ! : ", (saisiePrenom) => {
                    collegue.prenoms = saisiePrenom;
                    rl.question('Donner une date de naisssance (yyyy-mm-jj) : ', (saisieDate) => {
                        collegue.dateDeNaissance = saisieDate;
                        rl.question("Donner une url de photo : ", (saisieUrlPhoto) => {
                            collegue.photoUrl = saisieUrlPhoto;
                            rl.question("Donner une adresse email: ", (saisieEmail) => {
                                collegue.email = saisieEmail;
                                service.creerCollegue(collegue, (collegueCree) => {
                                    console.log(collegueCree);
                                    start();
                                }, (messageErr) => {
                                    console.log('OOps :', messageErr);
                                    start();
                                });
                            });
                        });
                    });
                });
            });

        } else if (saisie == 3) {
            var col = {};
            rl.question('Donner un nom ! : ', (saisieNom) => {
                console.log(`>> Recherche en cours du nom ${saisieNom}`);
                service.rechercherColleguesParNom(saisieNom, (colleguesTrouves) => {
                    // affichage du tableau des collègues trouvés
                    colleguesTrouves.forEach(collegue => {
                        console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.dateDeNaissance} ${collegue.matricule}`);
                    });
                }, (messageErr) => {
                    console.log('OOps :', messageErr);
                    start();
                });
                rl.question('Choisissez le nouvelle email : ', (saisieNewEmail) => {
                    col.email = saisieNewEmail;
                    rl.question('Choisissez le collegue à modifier : ', (saisieNumCollegue) => {
                        console.log(colleguesTrouves[saisieNumCollegue].matricule);
                        service.modifierEmail(colleguesTrouves[saisieNumCollegue].matricule, col, (collegueCree) => {
                            console.log(collegueCree);
                            start();
                        }, (messageErr) => {
                            console.log('OOps :', messageErr);
                        });
                    });
                });

            });

        }
        else if (saisie == 99) {
            console.log("Au revoir");
            rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
        }
        else {
            console.log("Veulliez taper une réponse valide ! ");
        }
    });
}
exports.run = start;

