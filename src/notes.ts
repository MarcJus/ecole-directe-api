import ec from "node-ecole-directe"
import {Note, DataNotes, Periode, Matiere, Trimestre} from "../typesApi/typesNotesAndPeriode"

namespace Notes {
    export interface PropertiesNotes{
        eleve: Promise<ec.Eleve | ec.Famille>,
        matiere?: Matiere,
        periode?: Trimestre,
        note?: number,
        higher?: number
        lower?: number
    }
    
    export interface PropertiesMoyenne{
        eleve: Promise<ec.Eleve | ec.Famille>,
        periode: string,
    }
    
    /**
     * @async
     * @param properties Propriétés pour récupérer les notes
     * @returns {Promise<Note[]>} Liste des notes
     */
    export async function getNotes (properties: PropertiesNotes):Promise<Note[]>{
        const notesReturn: Note[] = []
        await properties.eleve.then(async compte => {
            const eleve = (compte as ec.Eleve)
            await eleve.fetchNotes()
            .then(value => {
                const json: DataNotes = (value as any)
                const notes: Note[] = json.notes
                notes.forEach(note => {
                    if((note.codeMatiere == (properties.matiere as string)
                     || properties.matiere == undefined) 
                    && (note.codePeriode == (properties.periode as string)
                     || properties.periode == undefined)){
                        if(properties.note != undefined){
                            if(note.valeur == properties.note.toString())notesReturn.push(note)
                        } else {
                            if(isHigherAndOrLower(note, properties)){
                                notesReturn.push(note)
                            }
                        }
                    }
                })
            }).catch(err => {
                notesReturn == undefined
                console.log(err)
            })
        })
        return notesReturn
    }
    
    export async function getMoyenne(properties: PropertiesMoyenne): Promise<string>{
        let moyenneReturn = ""
        await properties.eleve.then(async compte => {
            const eleve = (compte as ec.Eleve)
            await eleve.fetchNotes()
            .then(value => {
                const periodes:Periode[] = ((value as any) as DataNotes).periodes
                periodes.forEach(periode => {
                    if(periode.idPeriode == properties.periode){
                        const moyenne: string = periode.ensembleMatieres.moyenneGenerale
                        moyenneReturn = moyenne
                    }
                })
            })
        })
        return moyenneReturn
    }
    
    export async function getPreMoyenne
    (connection: Promise<ec.Eleve | ec.Famille>): Promise<number>{
        let moyenneReturn = 0
        await connection.then(async compte => {
            const eleve = (compte as ec.Eleve)
            await eleve.fetchNotes()
            .then(value => {
                const notes: any[] = (value as any).notes
                let nombreDeNotes = 0
                let notesTotal = 0
                notes.forEach(note => {
                    if(note.codePeriode == "A003"){
                        let valeur = 0
                        let coef = 0
                        if(!(note.valeur as string).startsWith("Abs")
                         && (note.valeur as string) != ""){
                            valeur = Number((note.valeur as string).replace(",", "."))
                            coef = Number(note.coef)
                            if(Number(note.noteSur) != 20){
                                valeur = Number(valeur) * 20 / Number(note.noteSur)
                                console.log("matiere : "+note.codeMatiere)
                            }
                            nombreDeNotes += coef
                            notesTotal += (valeur * coef)
                            console.log("note : "+valeur)
                            console.log("coef : "+coef)
                            console.log("total des notes : "+notesTotal+"\n")
                        }
                    }
                })
                moyenneReturn = notesTotal / nombreDeNotes
                console.log("note total : "+notesTotal)
                console.log("denominateur : "+nombreDeNotes)
                console.log(moyenneReturn)
            })
        })
        return moyenneReturn
    }
    
    export async function getNotesAndPeriode
    (connection: Promise<ec.Eleve | ec.Famille>): Promise<DataNotes>{
        let returnNotes: DataNotes = undefined
        await connection.then(async compte => {
            const eleve = (compte as ec.Eleve)
            await eleve.fetchNotes().then(value => {
                const json: DataNotes = (value as any)
                returnNotes = json
            })
        })
        return returnNotes
    }
    
    export function isHigherAndOrLower(note: Note, properties: PropertiesNotes): boolean{
        const higher:number = properties.higher
        const lower:number = properties.lower
        if((Number(note.valeur) >= lower || properties.lower == undefined)
        && (Number(note.valeur) <= higher || properties.higher == undefined)){
            return true
        }
        return false
    }

}

export = Notes
