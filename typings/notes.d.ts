import ec from "node-ecole-directe";
import { Note, DataNotes } from "./types";
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
    type Matiere = "FRANC" | "MATHS" | "ESP2" | "TECHN" | "PH_CH" | "ANGL1" | "SVT" | "EPS" | "A-PLA" | "HI-GE" | "ELOQ" | "MUSIQ";
    type Trimestre = "A001" | "A002" | "A003";
}
export = Notes;
