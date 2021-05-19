import { Matiere } from "./typesNotesAndPeriode";
declare namespace Types {
    interface Day {
        day: string;
        devoirs: Devoirs[];
    }
    interface Devoirs {
        matiere: string;
        codeMatiere: Matiere;
        aFaire: boolean;
        idDevoir: number;
        documentAFaire: boolean;
        donneLe: string;
        effectue: boolean;
        interrogation: boolean;
        rendreEnLigne: boolean;
    }
}
export = Types;
