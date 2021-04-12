import * as ec from 'node-ecole-directe'

interface PropertiesNotes{
    eleve: Promise<ec.Eleve | ec.Famille>,
    matiere?: string,
    periode?: string | Periode,
    note?: number,
    higher?: number
    lower?: number
}

interface PropertiesMoyenne{
    eleve: Promise<ec.Eleve | ec.Famille>,
    periode: string,
}

async function getNotes (properties: PropertiesNotes):Promise<object[]>{
    let notesReturn: object[] = [];
    await properties.eleve.then(async compte => {
        const eleve = (compte as ec.Eleve);
        await eleve.fetchNotes()
        .then(value => {
            let notes = (value as any).notes;
            notes.forEach(note => {
                if((note.codeMatiere == properties.matiere || properties.matiere == undefined) 
                && (note.codePeriode == properties.periode.toString() || properties.periode == undefined)){
                    if(properties.note != undefined){
                        if(note.valeur == properties.note)notesReturn.push(note)
                    } else {
                        if(isHigherAndOrLower(note, properties)){
                            notesReturn.push(note)
                        };
                    }
                }
            })
        }).catch(err => {
            notesReturn == undefined;
            console.log(err);
        })
    })
    return notesReturn
}

async function getMoyenne(properties: PropertiesMoyenne): Promise<string>{
    let moyenneReturn: string = "";
    await properties.eleve.then(async compte => {
        const eleve = (compte as ec.Eleve);
        await eleve.fetchNotes()
        .then(value => {
            let periodes:any[] = (value as any).periodes;
            periodes.forEach(periode => {
                if(periode.idPeriode == properties.periode){
                    let moyenne: string = periode.ensembleMatieres.moyenneGenerale;
                    moyenneReturn = moyenne
                }
            })
        })
    })
    return moyenneReturn;
}

async function getPreMoyenne(connection: Promise<ec.Eleve | ec.Famille>){
    let moyenneReturn: number = 0;
    await connection.then(async compte => {
        const eleve = (compte as ec.Eleve);
        await eleve.fetchNotes()
        .then(value => {
            const notes: any[] = (value as any).notes;
            let nombreDeNotes: number = 0;
            let notesTotal: number = 0;
            notes.forEach(note => {
                if(note.codePeriode == "A003"){
                    let valeur: number = 0;
                    let coef: number = 0;
                    if(!(note.valeur as string).startsWith("Abs") && (note.valeur as string) != ""){
                        valeur = Number((note.valeur as string).replace(",", "."));
                        coef = Number(note.coef);
                        if(Number(note.noteSur) != 20){
                            valeur = Number(valeur) * 20 / Number(note.noteSur);
                            console.log("matiere : "+note.codeMatiere)
                        }
                        nombreDeNotes += coef;
                        notesTotal += (valeur * coef);
                        console.log("note : "+valeur)
                        console.log("coef : "+coef)
                        console.log("total des notes : "+notesTotal+"\n")
                    }
                }
            })
            moyenneReturn = notesTotal / nombreDeNotes
            console.log("note total : "+notesTotal);
            console.log("denominateur : "+nombreDeNotes)
        })
    });
    return moyenneReturn;
}

async function getNotesAndPeriode(connection: Promise<ec.Eleve | ec.Famille>){
    let returnNotes: object[] = [];
    await connection.then(async compte => {
        const eleve = (compte as ec.Eleve);
        await eleve.fetchNotes().then(value => {
            returnNotes = (value as any);
        })
    })
    return returnNotes;
}

function isHigherAndOrLower(note: any, properties: PropertiesNotes): boolean{
    let higher:number = properties.higher
    let lower:number = properties.lower
    if((note.valeur >= lower || properties.lower == undefined)
    && (note.valeur <= higher || properties.higher == undefined)){
        return true
    }
    return false
}

enum Periode{
    A001 = "A001",
    A002 = "A002",
    A003 = "A003"
}


enum Matiere{
    FRANC = "FRANC",
    MATHS = "MATHS",
    ESP = "ESP2",
    TECHN = "TECHN",
    PH_CH = "PH-CH",
    ANGL = "ANGL1",
    SVT = "SVT",
    EPS = "EPS",
    DESSIN = "A-PLA",
    HG = "HI-GE",
    ELOQ = "ELOQ",
    MUSIC = "MUSIQ"
}

export default {
    getNotes,
    getMoyenne,
    getPreMoyenne,
    getNotesAndPeriode,
    Periode,
    Matiere
}
