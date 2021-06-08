# ecole-directe-api

API utilisant le module [node-ecole-directe](https://github.com/Androz2091/node-ecole-directe) et le module [express](https://github.com/expressjs/express)

## Devoirs

2. Avec date

La date doit être au format YYYY-MM-DD

```http
GET /devoirs?date=<DATE>
```
### Reponse:
```json
{
        "matiere": {
            "entityCode": "",
            "entityLibelle": "",
            "entityType": "",
            "matiere": "",
            "codeMatiere": "",
            "nomProf": "",
            "id": 0,
            "interrogation": false,
            "blogActif": true,
            "nbJourMaxRenduDevoir": 0,
            "aFaire": {
                "idDevoir": ,
                "contenu": "",
                "rendreEnLigne": false,
                "donneLe": "",
                "effectue": false,
                "ressource": "",
                "ressourceDocuments": [],
                "documents": [
                    {
                        "id": ,
                        "libelle": "",
                        "date": "",
                        "taille": ,
                        "type": "",
                        "signatureDemandee": false,
                        "signature": {}
                    },
                ],
                "commentaires": [
                    {
                        "id": ,
                        "idAuteur": ,
                        "profilAuteur": "",
                        "auteur": "",
                        "date": "",
                        "message": "",
                        "supprime": false
                    }
                ],
                "elementsProg": [],
                "liensManuel": [],
                "documentsRendus": [],
                "contenuDeSeance": {
                    "contenu": "",
                    "documents": [],
                    "commentaires": []
                }
            }
        }
    }
```

2. Sans date

```json
{
    "day": "",
    "devoirs": [
        {
            "matiere": "",
            "codeMatiere": "",
            "aFaire": true,
            "idDevoir": 0,
            "documentsAFaire": false,
            "donneLe": "",
            "effectue": false,
            "interrogation": true,
            "rendreEnLigne": true
        }
    ]
}
```

La date est au format YYYY-MM-DD

## Notes

```http
GET /notes?periode=<PERIODE>&matiere=<MATIERE>&note=<NOTE>&lower=<LOWER>&higher=<HIGHER>
```
Parametres: 
* periode (optionnel) string : Trimestre de l'année (A001, A002, A003)
* matiere (optionnel) string : Code de la matiere 
* note (optionnel) number : Chercher un contrôle en fonction de la note
* lower (optionnel) number : Toutes les notes supérieures à ce paramètre (ATTENTION ! Non pris en compte si le paramètre "note" est utilisé)
* higher (optionnel) number : Toutes les notes inferieures à ce paramètre (ATTENTION ! Non pris en compte si le paramètre "note" est utilisé)

### Code des matières:
* MATHS = Mathématiques
* FRANC = Français
* ANGL1 = Anglais
* ESP2 = Espagnol
* PH-CH = Physique-Chimie
* SVT = SVT
* HI-GE = Histoire-Géographie
* MUSIQ = Musique
* DESSIN = A-PLA
* EPS = EPS
* ELOQ = Eloquence
* TECHN = Technologie

### Code des periodes:
* A001 = premier trimestre
* A002 = deuxième trimestre
* A003 = troisième trimestre

### Reponse :
```json
{
  "devoir": "",
  "codePeriode": "",
  "codeMatiere": "",
  "libelleMatiere": "",
  "codeSousMatiere": "",
  "typeDevoir": "",
  "enLettre": false,
  "coef": "",
  "noteSur": "",
  "valeur": "",
  "nonSignificatif": false,
  "date": "",
  "dateSaisie": "",
  "valeurisee": false,
  "moyenneClasse": "",
  "minClasse": "",
  "maxClasse": "",
  "elementsProgramme": []
}
```
Les dates sont au format YYYY-MM-DD

## Moyennes

```http
GET /notes/moyennes?periode=<PERIODE>
```

Parametres:
* periode (obligatoire) string : Trimestre de la moyenne. Le code est le même que pour les notes.

### Reponse : 
* moyenne: string
