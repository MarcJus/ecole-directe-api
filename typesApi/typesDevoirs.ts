import {Matiere} from "./typesNotesAndPeriode"

namespace Types{
    export interface Day{
        day: string,
        devoirs: Devoirs[]
    }

    export interface Devoirs{
        matiere: string,
        codeMatiere: Matiere,
        aFaire: boolean,
        idDevoir: number,
        documentAFaire: boolean,
        donneLe: string,
        effectue: boolean,
        interrogation: boolean,
        rendreEnLigne: boolean
    }
}

export = Types