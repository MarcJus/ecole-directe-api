declare namespace Types {
    interface NotesAndPeriodes {
        code: number;
        token: string;
        host: string;
        data: DataNotes;
    }
    interface DataNotes {
        periodes: Periode[];
        notes: Note[];
        parametrage: Parametrage;
        LSUN: LSUN;
    }
    interface LSUN {
        A001: Competences[];
        A002: Competences[];
        A003: Competences[];
    }
    interface Competences {
        cdt: boolean;
        codeMatiere: string;
        libelleMatiere: string;
        isFirstOfMatiere: boolean;
        nbElemProgMatiere: number;
        codeSousMatiere: string;
        libelleSousMatiere: string;
        isFirstOfSousMatiere: boolean;
        nbElemProgSousMatiere: number;
        libelleElementProgramme: string;
        idElemProg: number;
        valeur: string;
        professeurs: Professeur[];
    }
    interface Parametrage {
        couleurEval1: string;
        couleurEval2: string;
        couleurEval3: string;
        couleurEval4: string;
        libelleEval1: string;
        libelleEval2: string;
        libelleEval3: string;
        libelleEval4: string;
        affichageMoyenne: boolean;
        affichageMoyenneDevoir: boolean;
        affichagePositionMatiere: boolean;
        affichageNote: boolean;
        affichageCompetence: boolean;
        affichageEvaluationsComposantes: boolean;
        affichageGraphiquesComposantes: boolean;
        modeCalculGraphiquesComposantes: string;
        affichageCompNum: boolean;
        libelleEvalCompNum1: string;
        libelleEvalCompNum2: string;
        libelleEvalCompNum3: string;
        affichageAppreciation: boolean;
        appreciationsProf: boolean;
        appreciationProfPrinc: boolean;
        affichageMention: boolean;
        affichageAppreciationCE: boolean;
        affichageAppreciationVS: boolean;
        affichageAppreciationCN: boolean;
        affichageAppreciationClasse: boolean;
        affichageAppreciationPeriodeCloturee: boolean;
        moyenneUniquementPeriodeCloture: boolean;
        moyennePeriodeReleve: boolean;
        moyennePeriodeAnnuelle: boolean;
        moyennePeriodeHorsP: boolean;
        moyenneEleveDansNotes: boolean;
        moyenneEleve: boolean;
        moyenneEleveDansMoyenne: boolean;
        moyenneGenerale: boolean;
        moyenneCoefMatiere: boolean;
        moyenneClasse: boolean;
        moyenneMin: boolean;
        moyenneMax: boolean;
        moyenneRang: boolean;
        moyenneSur: number;
        moyenneGraphique: boolean;
        moyennesSimulation: boolean;
        coefficientNote: boolean;
        colonneCoefficientMatiere: boolean;
        noteGrasSousMoyenne: boolean;
        noteGrasAudessusMoyenne: boolean;
        libelleDevoir: boolean;
        dateDevoir: boolean;
        typeDevoir: boolean;
        noteUniquementPeriodeCloture: boolean;
        notePeriodeReleve: boolean;
        notePeriodeAnnuelle: boolean;
        notePeriodeHorsP: boolean;
        libellesAppreciations: string[];
        appreciationsParametrage: AppreciationsParametrage[];
    }
    interface AppreciationsParametrage {
        code: string;
        id: number;
        nbMaxCaractere: number;
        libelle: string;
    }
    interface Note {
        devoir: string;
        codePeriode: string;
        codeMatiere: string;
        libelleMatiere: string;
        codeSousMatiere: string;
        typeDevoir: string;
        enLettre: boolean;
        coef: string;
        noteSur: string;
        valeur: string;
        nonSignificatif: boolean;
        date: string;
        dateSaisie: string;
        valeurisee: boolean;
        moyenneClasse: string;
        minClasse: string;
        maxClasse: string;
        elementsProgramme: ElementsProgramme[];
        qcm?: Qcm;
    }
    interface Qcm {
        idQCM: number;
        idAssociation: number;
        titre: string;
        debute: string;
    }
    interface ElementsProgramme {
        descriptif: string;
        idElemProg: number;
        valeur: string;
        cdt: boolean;
        idCompetence: number;
        libelleCompetence: string;
    }
    interface Periode {
        idPeriode: string;
        codePeriode: string;
        periode: Trimestre;
        annuel: boolean;
        dateDebut: string;
        dateFin: string;
        examenBlanc: boolean;
        cloture: boolean;
        dateConseil?: string;
        heureConseil?: string;
        moyNbreJoursApresConseil: number;
        ensembleMatieres: EnsembleMatieres;
    }
    interface EnsembleMatieres {
        dateCalcul: string;
        moyenneGenerale: string;
        moyenneClasse: string;
        moyenneMin: string;
        moyenneMax: string;
        nomPP: string;
        nomCE: string;
        decisionDuConseil: string;
        disciplines: Discipline[];
        disciplinesSimulation: any[];
    }
    interface Discipline {
        id: number;
        codeMatiere: Matiere;
        codeSousMatiere: string;
        discipline: string;
        moyenne: string;
        moyenneClasse: string;
        moyenneMin: string;
        moyenneMax: string;
        coef: number;
        effectif: number;
        rang: number;
        groupeMatiere: boolean;
        idGroupeMatiere: number;
        option: number;
        sousMatiere: boolean;
        saisieAppreciationSSMat: boolean;
        professeurs: Professeur[];
    }
    interface Professeur {
        id: number;
        nom: string;
    }
    type Matiere = "FRANC" | "MATHS" | "ESP2" | "TECHN" | "PH_CH" | "ANGL1" | "SVT" | "EPS" | "A-PLA" | "HI-GE" | "ELOQ" | "MUSIQ";
    type Trimestre = "A001" | "A002" | "A003";
}
export = Types;
