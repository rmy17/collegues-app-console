// récupération du module `readline`
const readline = require('readline');
const { Service } = require('./service.js');

const service = new Service();
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const start = () => {
    const str1 = "1. Rechercher un collègue par nom\n";
    const str2 = "2. Créer un collègue\n";
    const str3 = "3. Modifier l'email d'un collègue \n";
    const str4 = "4. Modifier l'url de la photo d'un collègue \n";
    const str99 = "99. Sortir";
    console.log(`${str1} ${str2} ${str3} ${str4} ${str99}`);
    rl.question('Faites un choix ? : ', (saisie) => {
        if (saisie == 1) {
            rl.question('Donner un nom ! : ', (saisieNom) => {
                console.log(`>> Recherche en cours du nom ${saisieNom}`);
                service.rechercherColleguesParNom(saisieNom).then(tabResultats => {
                    tabResultats.forEach(collegue => {
                        console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.dateDeNaissance} ${collegue.matricule}`);
                    });
                    start();
                }).catch(err => console.log(`Oops ${err}`));
            });
        }
        else if (saisie == 2) {
            let collegue = {};

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

                                service.creerUnCollegue(collegue)
                                    .then(collegueCree => {
                                        console.log(collegueCree);
                                        start();
                                    })
                                    .catch(err => {
                                        console.log(`Oops ${err}`);
                                        start();
                                    });
                            });
                        });
                    });
                });
            });

        } else if (saisie == 3) {
            let matricule = {};
            let email = {};
            rl.question("Donner un nom ! : ", (saisieNom) => {
            service.rechercherColleguesParNom(saisieNom).then(tabResultats => {
                tabResultats.forEach(collegue => {
                    console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.dateDeNaissance} ${collegue.matricule}`);
                });
                return tabResultats;

            }).then(tabResultats => {
                rl.question('Saisissez le collègue à modifier : ', numeroCollegue => {
                    matricule = tabResultats[numeroCollegue-1].matricule;

                    rl.question('Saisissez le nouvel mail  du collègue : ', mailSaisi => {
                        email.email = mailSaisi;
                        console.log(email);
                        console.log(matricule);
                        service.modifierEmail(matricule, email)
                            .then(collegueModifie => {
                                console.log("L'email a bien été modifié:");
                                console.log(collegueModifie);
                                start();
                            })
                            .catch((err) => {
                                console.log(`${err}`);
                                start();
                            });
                    });
                });
            }).catch (err => {
                console.log(`Oops ${err}`);
                start();});
        });
        }
        else if (saisie == 4) {
    let matricule = {};
    let url = {};
    rl.question("Donner un nom ! : ", (saisieNom) => {
        service.rechercherColleguesParNom(saisieNom).then(tabResultats => {
            tabResultats.forEach(collegue => {
                console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.dateDeNaissance} ${collegue.matricule}`);
            });
            return tabResultats;

        }).then(tabResultats => {
            rl.question('Saisissez le collègue à modifier : ', numeroCollegue => {
                matricule = tabResultats[numeroCollegue-1].matricule;

                rl.question('Saisissez le nouvel url de la photo du collègue : ', mailSaisi => {
                    url.url = mailSaisi;
                    console.log(url);
                    console.log(matricule);
                    service.modifierPhotoUrl(matricule, url)
                        .then(collegueModifie => {
                            console.log("L'url a bien été modifié:");
                            console.log(collegueModifie);
                            start();
                        })
                        .catch((err) => {
                            console.log(`${err}`);
                            start();
                        });
                });
            });
        }).catch (err => {
            console.log(`Oops ${err}`);
            start();});
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

