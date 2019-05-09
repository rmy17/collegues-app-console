// récupération du module `readline`
import * as readline from 'readline';
import {Service} from './service';

const service = new Service();
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const authenti = () => {
    rl.question('Donner un nom ! : ', (saisieMail => {
        console.log(`>> Recherche en cours du nom ${saisieMail}`);
}

const start = () => {

    const str1 = "1. Rechercher un collègue par nom\n";
    const str2 = "2. Créer un collègue\n";
    const str3 = "3. Modifier l'email d'un collègue \n";
    const str4 = "4. Modifier l'url de la photo d'un collègue \n";
    const str99 = "99. Sortir";
    console.log(`${str1} ${str2} ${str3} ${str4} ${str99}`);
    rl.question('Faites un choix ? : ', (saisie:string) => {
        if (saisie == '1') {
            rl.question('Donner un nom ! : ', (saisieNom) => {
                console.log(`>> Recherche en cours du nom ${saisieNom}`);
                service.rechercherColleguesParNom(saisieNom).then(tabResultats => {
                    tabResultats.forEach((collegue:any) : void => {
                        console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.dateDeNaissance} ${collegue.matricule}`);
                    });
                    start();
                }).catch(err => console.log(`Oops ${err}`));
            });
        }
        else if (saisie == '2') {
            let collegue:any = {};

            rl.question("Donner un nom ! : ", (saisieNom:string) => {
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

        } else if (saisie == '3') {
            let matricule = {};
            let email:any = {};
            rl.question("Donner un nom ! : ", (saisieNom) => {
            service.rechercherColleguesParNom(saisieNom).then(tabResultats => {
                tabResultats.forEach((collegue:any) => {
                    console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.dateDeNaissance} ${collegue.matricule}`);
                });
                return tabResultats;

            }).then((tabResultats:any) => {
                rl.question('Saisissez le collègue à modifier : ', (numeroCollegue:any) => {
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
        else if (saisie == '4') {
    let matricule = {};
    let url:any = {};
    rl.question("Donner un nom ! : ", (saisieNom) => {
        service.rechercherColleguesParNom(saisieNom).then(tabResultats => {
            tabResultats.forEach((collegue:any) :any => {
                console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.dateDeNaissance} ${collegue.matricule}`);
            });
            return tabResultats;

        }).then((tabResultats:any) => {
            rl.question('Saisissez le collègue à modifier : ', (numeroCollegue:any) => {
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
else if (saisie == '99') {
    console.log("Au revoir");
    rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
}
else {
    console.log("Veulliez taper une réponse valide ! ");
}
    });
}
exports.run = start;

