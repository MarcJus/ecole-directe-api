import * as ec from 'node-ecole-directe'

interface PropertiesNotes{
    eleve: Promise<ec.Eleve | ec.Famille>,
    matiere?: string,
    periode?: string,
    note?: number
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
                && (note.codePeriode == properties.periode || properties.periode == undefined)
                && (note.valeur == properties.note || properties.note == undefined)){
                    notesReturn.push(note);
                }  
            })
        }).catch(err => {
            notesReturn == undefined;
        })
    })
    return notesReturn
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
    Periode,
    Matiere
}
