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
Object.defineProperty(exports, "__esModule", { value: true });
const ent_1 = __importDefault(require("ent"));
function getDevoir(properties) {
    return __awaiter(this, void 0, void 0, function* () {
        let returnDevoir = new Array();
        const elevePromise = properties.eleve;
        yield elevePromise.then((compte) => __awaiter(this, void 0, void 0, function* () {
            const eleve = compte;
            if (properties.date != undefined) {
                yield eleve.fetchCahierDeTexteJour(properties.date)
                    .then(value => {
                    value.forEach(devoirs => {
                        let devoir = devoirs;
                        let contenuEncoded = devoir.matiere.aFaire.contenu;
                        if (contenuEncoded != undefined)
                            devoir.matiere.aFaire.contenu = decodeText(contenuEncoded);
                        if (devoir.matiere.contenuDeSeance != undefined) {
                            if (devoir.matiere.contenuDeSeance.contenu != '') {
                                let seanceEncoded = devoir.matiere.aFaire.contenuDeSeance.contenu;
                                let decoded = decodeText(seanceEncoded);
                                devoir.matiere.aFaire.contenuDeSeance.contenu = decoded;
                                devoir.matiere.contenuDeSeance.contenu = decoded;
                            }
                        }
                        returnDevoir.push(devoir);
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                yield eleve.fetchCahierDeTexte()
                    .then(value => {
                    value.forEach(devoirs => {
                        let devoir = devoirs;
                        returnDevoir.push(devoir);
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        }));
        return returnDevoir;
    });
}
function removeHtmlTag(text) {
    text = text.toString();
    return text.replace(/<[^>]*>/g, "").replace("\n", "");
}
function decodeText(text) {
    let buffer = Buffer.from(text, "base64");
    return removeHtmlTag(ent_1.default.decode(buffer.toString('utf-8')));
}
exports.default = {
    getDevoir,
};
