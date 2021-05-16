import * as ec from 'node-ecole-directe';
import types from './types';
interface PropertiesNotes {
    eleve: Promise<ec.Eleve | ec.Famille>;
    matiere?: string;
    periode?: string;
    note?: number;
    higher?: number;
    lower?: number;
}
interface PropertiesMoyenne {
    eleve: Promise<ec.Eleve | ec.Famille>;
    periode: string;
}
declare function getNotes(properties: PropertiesNotes): Promise<types.Note[]>;
declare function getMoyenne(properties: PropertiesMoyenne): Promise<string>;
declare function getPreMoyenne(connection: Promise<ec.Eleve | ec.Famille>): Promise<number>;
declare function getNotesAndPeriode(connection: Promise<ec.Eleve | ec.Famille>): Promise<types.DataNotes>;
declare enum Periode {
    A001 = "A001",
    A002 = "A002",
    A003 = "A003"
}
declare enum Matiere {
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
export { getNotes, getMoyenne, getPreMoyenne, getNotesAndPeriode, Periode, Matiere, PropertiesNotes, PropertiesMoyenne };
