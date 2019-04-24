
//let
let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris";
console.log(favoriteCityId);

//const
const citiesId = ["paris","nyc","rome","rio-de-janeiro"];
console.log(citiesId);
//citiesId =[];
//console.log(citiesId);
citiesId.push("tokyo");
console.log(citiesId);

//Création d'objet
function getWeather(cityId){
    let city = cityId.toUpperCase();
    let temperature = 20;
    return {city , temperature}
}

const weather = getWeather(favoriteCityId);
console.log(weather);

//Affectation destructurée
let {city} = getWeather(favoriteCityId);
let {temperature} = getWeather(favoriteCityId);
console.log(city);
console.log(temperature);

//Rest operator
let [parisId, nycId , ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

//Classe
 class Trip{
     constructor(id,name,imageUrl){
         this.id = id;
         this.name = name;
         this.imageUrl = imageUrl;
     }

    toString(){
        return "Trip "+"["+this.id +", "+ this.name+ ", "+this.imageUrl+", "+this._price+"]";
    }

    get price(){
        return this._price;
    }

    set price(newPrice){
        this._price = newPrice;
    }

    static getDefaultTrip(){
        return new Trip("rio-de-janeiro","Rio de Janeiro","img/rio-de-janeiro.jpg");
    }

 }
let parisTrip = new Trip("paris","PARIS","img/paris.jpg");
 console.log(parisTrip);
 console.log(parisTrip.name);
 console.log(parisTrip.toString());
 parisTrip.price=100;
 console.log(parisTrip.toString());
 const defaultTrip = Trip.getDefaultTrip();
 console.log(defaultTrip.toString());


class FreeTrip extends Trip{
    constructor(id,name,imageUrl){
        super(id,name,imageUrl)
        this.price = 0;
    }

    toString(){
        return `FreeTrip [${this.id}, ${this.name}, ${this.imageUrl}, ${this._price}]`;
    }

}

const freeTrip = new FreeTrip("nantes","NANTES","img/nantes.jpg");
console.log(freeTrip.toString());


/* ********************************************************* */

class TripService {

    constructor() {
        this.voyageSet = new Set();
        this.voyageSet.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.voyageSet.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.voyageSet.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    };

    findByName(tripName) {

         return new Promise((resolve, reject) => {

             setTimeout( () => {
                 // ici l'exécution du code est asynchrone

                 // TODO utiliser resolve et reject en fonction du résultat de la recherche
                this.voyageSet.forEach(voyage => {
                    if(tripName === voyage.name){
                        resolve(`Trip found : `+voyage.toString());
                    }
                    else{
                        reject(`No trip with name ${tripName}`);
                    }
                });

             }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        // TODO Map of 2 trips
        // 'paris' --> price = 100
        // 'rio-de-janeiro' --> price = 800)
        // no price for 'nantes'

        this.voyageMap = new Map();
        this.voyageMap.set('paris',100);
        this.voyageMap.set('rio-de-janeiro',800);
        this.voyageMap.set('nantes');
    }

    findPriceByTripId(tripId) {

       return new Promise((resolve, reject) => {

                    setTimeout( () => {
                        // ici l'exécution du code est asynchrone
                        
                        // TODO utiliser resolve et reject en fonction du résultat de la recherche
                        if(this.voyageMap.get(tripId)){
                            resolve("Price found :"+this.voyageMap.get(tripId));
                        }else{
                            reject(`No price found for id ${tripId}`);
                        }
                    }, 2000)
               });
    }
}

let rechercheNom = new TripService();
rechercheNom.findByName("Paris")
.then( voyage => {
 // ok
 console.log(voyage);
})
.catch(err => {
 // ok
 console.log(err);
})

let recherchePrix = new PriceService();
recherchePrix.findPriceByTripId("nantes")
.then( voyage => {
 // ok
 console.log(voyage);
})
.catch(err => {
 // ok
 console.log(err);
})

