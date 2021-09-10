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
var Notes;
(function (Notes) {
    function getNotes(properties) {
        return __awaiter(this, void 0, void 0, function* () {
            const notesReturn = [];
            yield properties.eleve.then((compte) => __awaiter(this, void 0, void 0, function* () {
                const eleve = compte;
                yield eleve.fetchNotes()
                    .then(value => {
                    const json = value;
                    const notes = json.notes;
                    notes.forEach(note => {
                        if ((note.codeMatiere == properties.matiere
                            || properties.matiere == undefined)
                            && (note.codePeriode == properties.periode
                                || properties.periode == undefined)) {
                            if (properties.note != undefined) {
                                if (note.valeur == properties.note.toString())
                                    notesReturn.push(note);
                            }
                            else {
                                if (isHigherAndOrLower(note, properties)) {
                                    notesReturn.push(note);
                                }
                            }
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
    Notes.getNotes = getNotes;
    function getMoyenne(properties) {
        return __awaiter(this, void 0, void 0, function* () {
            let moyenneReturn = "";
            yield properties.eleve.then((compte) => __awaiter(this, void 0, void 0, function* () {
                const eleve = compte;
                yield eleve.fetchNotes()
                    .then(value => {
                    const periodes = value.periodes;
                    periodes.forEach(periode => {
                        if (periode.idPeriode == properties.periode) {
                            const moyenne = periode.ensembleMatieres.moyenneGenerale;
                            moyenneReturn = moyenne;
                        }
                    });
                });
            }));
            return moyenneReturn;
        });
    }
    Notes.getMoyenne = getMoyenne;
    function getPreMoyenne(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            let moyenneReturn = 0;
            yield connection.then((compte) => __awaiter(this, void 0, void 0, function* () {
                const eleve = compte;
                yield eleve.fetchNotes()
                    .then(value => {
                    const notes = value.notes;
                    let nombreDeNotes = 0;
                    let notesTotal = 0;
                    notes.forEach(note => {
                        if (note.codePeriode == "A003") {
                            let valeur = 0;
                            let coef = 0;
                            if (!note.valeur.startsWith("Abs")
                                && note.valeur != "") {
                                valeur = Number(note.valeur.replace(",", "."));
                                coef = Number(note.coef);
                                if (Number(note.noteSur) != 20) {
                                    valeur = Number(valeur) * 20 / Number(note.noteSur);
                                    console.log("matiere : " + note.codeMatiere);
                                }
                                nombreDeNotes += coef;
                                notesTotal += (valeur * coef);
                                console.log("note : " + valeur);
                                console.log("coef : " + coef);
                                console.log("total des notes : " + notesTotal + "\n");
                            }
                        }
                    });
                    moyenneReturn = notesTotal / nombreDeNotes;
                    console.log("note total : " + notesTotal);
                    console.log("denominateur : " + nombreDeNotes);
                    console.log(moyenneReturn);
                });
            }));
            return moyenneReturn;
        });
    }
    Notes.getPreMoyenne = getPreMoyenne;
    function getNotesAndPeriode(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnNotes = undefined;
            yield connection.then((compte) => __awaiter(this, void 0, void 0, function* () {
                const eleve = compte;
                yield eleve.fetchNotes().then(value => {
                    const json = value;
                    returnNotes = json;
                });
            }));
            return returnNotes;
        });
    }
    Notes.getNotesAndPeriode = getNotesAndPeriode;
    function isHigherAndOrLower(note, properties) {
        const higher = properties.higher;
        const lower = properties.lower;
        if ((Number(note.valeur) >= lower || properties.lower == undefined)
            && (Number(note.valeur) <= higher || properties.higher == undefined)) {
            return true;
        }
        return false;
    }
    Notes.isHigherAndOrLower = isHigherAndOrLower;
})(Notes || (Notes = {}));
module.exports = Notes;
