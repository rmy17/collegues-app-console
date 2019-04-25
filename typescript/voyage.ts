import { promises } from "fs";


class Sejour {

    constructor(private _nom: string, private _prix: number) {
    }

    get nom() {
        return this._nom;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

    get prix() {
        return this._prix;
    }

    set prix(prix: number) {
        this._prix = prix;
    }
}

class SejourService {
    private sejours: Sejour[] = [];
    constructor() {
        this.sejours.push(new Sejour("Paris", 100));
        this.sejours.push(new Sejour("Rio de Janeiro", 800));
        this.sejours.push(new Sejour("Australie", 1500));
    }

    rechercheSejourParNom(nomSejour: string): Promise<Sejour> {

        return new Promise<Sejour>((resolve, reject) => {
            for (let i = 0; i < this.sejours.length; i++) {
                if (this.sejours[i].nom === nomSejour) {
                    resolve(this.sejours[i]);
                }
            }
            reject("Pas de séjour trouvé");
        });
    }
}


let sejour = new SejourService();
console.log(sejour.rechercheSejourParNom("Paris")
.then(sejour => console.log(sejour))
.catch (err => console.log `Oops, ce jour n'existe pas ${err}`));