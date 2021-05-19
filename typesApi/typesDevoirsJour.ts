import typesNotes from "./typesNotesAndPeriode"

namespace Types{
    export interface DevoirJour {
        matiere: Matiere
    }

    export interface Matiere {
        entityCode: string,
        entityLibelle: string,
        entityType: string,
        matiere: string,
        codeMatiere: typesNotes.Matiere,
        nomProf: string,
        id: number,
        interrogation: boolean,
        blogActif: boolean,
        nbJourMaxRenduDevoir: number,
        aFaire: AFaire,
        contenuDeSeance: ContenuDeSeance
    }

    export interface AFaire {
        idDevoir: number,
        contenu: string,
        rendreEnLigne: boolean,
        donneLe: string,
        effectue: boolean,
        ressource: string,
        ressourceDocuments: [],
        documents: [],
        commentaires: [],
        elementsProg: [],
        liensManuel: [],
        documentsRendus: [],
        contenuDeSeance: ContenuDeSeance
    }

    export interface ContenuDeSeance {
        idDevoir: number,
        contenu: string,
        documents: [],
        commentaires: [],
        elementsProg: [],
        liensManuel: []
    }
}

export = Types