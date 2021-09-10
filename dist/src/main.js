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
const connection_1 = __importDefault(require("./connection"));
const notes_1 = __importDefault(require("./notes"));
const devoir_1 = __importDefault(require("./devoir"));
const messagerie_1 = __importDefault(require("./messagerie"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
function nombreNotes() {
    return __awaiter(this, void 0, void 0, function* () {
        yield notes_1.default.getNotes({ eleve: connection_1.default, matiere: "EPS" })
            .then(value => {
            console.log(value.length);
        });
    });
}
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});
app.get("/", (req, res) => {
    res.header("Content-Type: text/html");
    res.send("API Ecole Directe <a href=\"https://github.com/MarcJus/private-api-ecole-directe\">github</a>");
});
app.get("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const matiere = query.matiere == undefined ?
        undefined : query.matiere.toString().toUpperCase();
    const periode = query.periode == undefined ?
        undefined : query.periode.toString().toUpperCase();
    const note = query.note == undefined ? undefined : Number(query.note);
    const higher = query.higher == undefined ? undefined : Number(query.higher);
    const lower = query.lower == undefined ? undefined : Number(query.lower);
    yield notes_1.default.getNotes({ eleve: connection_1.default, matiere: matiere,
        periode: periode, note: note, lower: lower, higher: higher })
        .then(value => {
        res.send(value);
    }).catch(err => {
        res.json({ error: err });
    });
}));
app.get("/notes/moyenne", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    if (query.periode != undefined) {
        const periode = query.periode.toString();
        if (periode == "A001" || periode == "A002" || periode == "A003") {
            yield notes_1.default.getMoyenne({ eleve: connection_1.default, periode: periode }).then(value => {
                res.send(value);
            }).catch(err => {
                res.status(500).json({ success: false, err: err });
            });
        }
        else {
            res.status(400).json({ success: false, err: "Mauvaise periode" });
        }
    }
    else {
        res.status(400).json({ success: false, err: "Periode non specifie" });
    }
}));
app.get("/notes/moyenne/preview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    if (query.periode != undefined) {
        const periode = query.periode.toString();
        if (periode == "A001" || periode == "A002" || periode == "A003") {
            yield notes_1.default.getPreMoyenne(connection_1.default).then(value => {
                res.sendStatus(200);
                res.send(value);
                console.log(value);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
        else {
            res.status(400).json({ success: false, err: "Mauvaise periode" });
        }
    }
    else {
        res.status(400).json({ success: false, err: "Periode non specifie" });
    }
}));
app.get("/fetchNotes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield notes_1.default.getNotesAndPeriode(connection_1.default).then(value => {
        res.json(value);
    });
}));
app.get("/fetchDevoirs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield devoir_1.default.getDevoir({ eleve: connection_1.default }).then(value => {
        res.json(value);
    });
}));
app.get("/devoirs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const date = query.date == undefined ? undefined :
        query.date.toString().replace("/", "-").replace("/", "-");
    yield devoir_1.default.getDevoir({ eleve: connection_1.default, date: date }).then(value => {
        const reply = value;
        res.json(reply);
    }).catch(err => {
        res.json({ error: err });
    });
}));
app.get("/messagerie", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield messagerie_1.default.getMessagerie(connection_1.default).then(value => {
        res.json(value);
    }).then(err => {
        res.send(err);
    });
}));
app.get("/edt", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Edt");
}));
app.get("/shortcuts/devoirs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = "test";
    const dates = [];
    yield devoir_1.default.getDevoir({ eleve: connection_1.default })
        .then((value) => {
        value.forEach(devoirs => {
            const devoir = devoirs;
            dates.push(devoir.day);
        });
    });
    dates.forEach((date) => __awaiter(void 0, void 0, void 0, function* () {
        yield devoir_1.default.getDevoir({ eleve: connection_1.default, date: date })
            .then((value) => {
            const devoir = value[0];
            console.log(devoir.matiere);
        });
    }));
    res.send(reply);
}));
console.log("server start");
app.listen(8080);
