import typesNotes from "./typesNotesAndPeriode";
declare namespace Types {
    interface DevoirJour {
        matiere: Matiere;
    }
    interface Matiere {
        entityCode: string;
        entityLibelle: string;
        entityType: string;
        matiere: string;
        codeMatiere: typesNotes.Matiere;
        nomProf: string;
        id: number;
        interrogation: boolean;
        blogActif: boolean;
        nbJourMaxRenduDevoir: number;
        aFaire: AFaire;
        contenuDeSeance: ContenuDeSeance;
    }
    interface AFaire {
        idDevoir: number;
        contenu: string;
        rendreEnLigne: boolean;
        donneLe: string;
        effectue: boolean;
        ressource: string;
        ressourceDocuments: [];
        documents: [];
        commentaires: [];
        elementsProg: [];
        liensManuel: [];
        documentsRendus: [];
        contenuDeSeance: ContenuDeSeance;
    }
    interface ContenuDeSeance {
        idDevoir: number;
        contenu: string;
        documents: [];
        commentaires: [];
        elementsProg: [];
        liensManuel: [];
    }
}
export = Types;
