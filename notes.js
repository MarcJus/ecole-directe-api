"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getNotes(properties) {
    return __awaiter(this, void 0, void 0, function* () {
        let notesReturn = [];
        yield properties.eleve.then((compte) => __awaiter(this, void 0, void 0, function* () {
            const eleve = compte;
            yield eleve.fetchNotes()
                .then(value => {
                let notes = value.notes;
                notes.forEach(note => {
                    if ((note.codeMatiere == properties.matiere || properties.matiere == undefined)
                        && (note.codePeriode == properties.periode || properties.periode == undefined)) {
                        if (properties.note != undefined) {
                            if (note.valeur == properties.note)
                                notesReturn.push(note);
                        }
                        else {
                        }
                        notesReturn.push(note);
                    }
                });
            }).catch(err => {
                notesReturn == undefined;
                console.log(err);
            });
        }));
        return notesReturn;
    });
}
function isHigherAndOrLower(note, properties) {
    let higher = properties.higher;
    let lower = properties.lower;
    if ((note >= lower || lower == undefined)
        && (note <= higher || higher == undefined)) {
        return true;
    }
    return false;
}
var Periode;
(function (Periode) {
    Periode["A001"] = "A001";
    Periode["A002"] = "A002";
    Periode["A003"] = "A003";
})(Periode || (Periode = {}));
var Matiere;
(function (Matiere) {
    Matiere["FRANC"] = "FRANC";
    Matiere["MATHS"] = "MATHS";
    Matiere["ESP"] = "ESP2";
    Matiere["TECHN"] = "TECHN";
    Matiere["PH_CH"] = "PH-CH";
    Matiere["ANGL"] = "ANGL1";
    Matiere["SVT"] = "SVT";
    Matiere["EPS"] = "EPS";
    Matiere["DESSIN"] = "A-PLA";
    Matiere["HG"] = "HI-GE";
    Matiere["ELOQ"] = "ELOQ";
    Matiere["MUSIC"] = "MUSIQ";
})(Matiere || (Matiere = {}));
exports.default = {
    getNotes,
    Periode,
    Matiere
};
