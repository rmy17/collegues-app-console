import * as request from 'request-promise-native';

const req = request.defaults({jar: true})


 export class Service {


    rechercherColleguesParNom(nomRecherche) {

        return req(`https://remvia-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true })
            .then(
                tabMatricules => {

                    const tabPromesses2 = tabMatricules.map(matricule => this.rechercherColleguesParMatricule(matricule));

                    return Promise.all(tabPromesses2)
                }
            )

        // à noter que la fonction ne retourne rien ici
    }


    rechercherColleguesParMatricule(matricule) {


        return req(`https://remvia-collegues-api.herokuapp.com/collegues/${matricule}`, {
            json: true
        });
        // à noter que la fonction ne retourne rien ici
    }


    creerUnCollegue(collegue) {


        return req({
            url: "https://remvia-collegues-api.herokuapp.com/collegues",
            method: 'POST',
            json: true,
            body: collegue
        });
    }

    modifierEmail(matricule, collegueAModifier) {

        return request({
            url: `https://remvia-collegues-api.herokuapp.com/collegues/${matricule}`,
            method: 'PATCH',
            json: true,
            body: collegueAModifier
        });
    }

    modifierPhotoUrl(matricule, collegueAModifier) {
        return request({
            url: `https://remvia-collegues-api.herokuapp.com/collegues/${matricule}`,
            method: 'PATCH',
            json: true,
            body: collegueAModifier
        });
    }
}

//exports.Service = Service;

