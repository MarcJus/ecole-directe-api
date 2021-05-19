import ec from "node-ecole-directe";
import { Note, DataNotes, Matiere, Trimestre } from "../typesApi/typesNotesAndPeriode";
declare namespace Notes {
    interface PropertiesNotes {
        eleve: Promise<ec.Eleve | ec.Famille>;
        matiere?: Matiere;
        periode?: Trimestre;
        note?: number;
        higher?: number;
        lower?: number;
    }
    interface PropertiesMoyenne {
        eleve: Promise<ec.Eleve | ec.Famille>;
        periode: string;
    }
    function getNotes(properties: PropertiesNotes): Promise<Note[]>;
    function getMoyenne(properties: PropertiesMoyenne): Promise<string>;
    function getPreMoyenne(connection: Promise<ec.Eleve | ec.Famille>): Promise<number>;
    function getNotesAndPeriode(connection: Promise<ec.Eleve | ec.Famille>): Promise<DataNotes>;
    function isHigherAndOrLower(note: Note, properties: PropertiesNotes): boolean;
}
export = Notes;
