"use strict";
var Sejour = /** @class */ (function () {
    function Sejour(_nom, _prix) {
        this._nom = _nom;
        this._prix = _prix;
    }
    Object.defineProperty(Sejour.prototype, "nom", {
        get: function () {
            return this._nom;
        },
        set: function (nom) {
            this._nom = nom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sejour.prototype, "prix", {
        get: function () {
            return this._prix;
        },
        set: function (prix) {
            this._prix = prix;
        },
        enumerable: true,
        configurable: true
    });
    return Sejour;
}());
var SejourService = /** @class */ (function () {
    function SejourService() {
        this.sejours = [];
        this.sejours.push(new Sejour("Paris", 100));
        this.sejours.push(new Sejour("Rio de Janeiro", 800));
        this.sejours.push(new Sejour("Australie", 1500));
    }
    SejourService.prototype.rechercheSejourParNom = function (nomSejour) {
        for (var i = 0; i < 10; i++) {
            if (this.sejours[i].nom === nomSejour) {
                return this.sejours[i];
            }
        }
    };
    return SejourService;
}());
var sejour = new SejourService();
console.log(sejour.rechercheSejourParNom("Paris"));
