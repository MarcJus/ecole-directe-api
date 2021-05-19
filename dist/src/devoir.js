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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ent_1 = __importDefault(require("ent"));
var Devoir;
(function (Devoir) {
    function getDevoir(properties) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnDevoir = new Array();
            const elevePromise = properties.eleve;
            try {
                yield elevePromise.then((compte) => __awaiter(this, void 0, void 0, function* () {
                    const eleve = compte;
                    if (properties.date != undefined) {
                        yield eleve.fetchCahierDeTexteJour(properties.date)
                            .then(value => {
                            const devoirs = value;
                            devoirs.forEach(devoir => {
                                if (devoirs == undefined) {
                                    console.log("devoirs null");
                                    return returnDevoir;
                                }
                                if (devoir.matiere.aFaire != undefined) {
                                    const contenuEncoded = devoir.matiere.aFaire.contenu;
                                    if (contenuEncoded != undefined)
                                        devoir.matiere.aFaire.contenu = decodeText(contenuEncoded);
                                    if (devoir.matiere.contenuDeSeance != undefined) {
                                        if (devoir.matiere.contenuDeSeance.contenu != "") {
                                            const seanceEncoded = devoir.matiere.aFaire.contenuDeSeance.contenu;
                                            const decoded = decodeText(seanceEncoded);
                                            devoir.matiere.aFaire.contenuDeSeance.contenu = decoded;
                                            devoir.matiere.contenuDeSeance.contenu = decoded;
                                        }
                                    }
                                    returnDevoir.push(devoir);
                                }
                                else {
                                    console.log("Aucun contenu : " + devoir.matiere.matiere);
                                }
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                    else {
                        yield eleve.fetchCahierDeTexte()
                            .then(value => {
                            const data = value;
                            console.log(data);
                            data.forEach(day => {
                                const today = new Date();
                                const dateISO = today.toISOString().substr(0, 10);
                                if (day.day != dateISO) {
                                    returnDevoir.push(day);
                                }
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                }));
            }
            catch (e) {
                console.log(e);
            }
            return returnDevoir;
        });
    }
    Devoir.getDevoir = getDevoir;
    function removeHtmlTag(text) {
        text = text.toString();
        return text.replace(/<[^>]*>/g, "").replace("\n", "");
    }
    Devoir.removeHtmlTag = removeHtmlTag;
    function decodeText(text) {
        const buffer = Buffer.from(text, "base64");
        return removeHtmlTag(ent_1.default.decode(buffer.toString("utf-8")));
    }
    Devoir.decodeText = decodeText;
})(Devoir || (Devoir = {}));
module.exports = Devoir;
