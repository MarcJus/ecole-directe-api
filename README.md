# ecole-directe-api

API utilisant le module [node-ecole-directe](https://github.com/Androz2091/node-ecole-directe) et le module [express](https://github.com/expressjs/express)

## Devoirs

2. Avec date

La date doit être au format YYYY-MM-DD

```http
GET /devoirs?date=date
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
GET /notes?periode=<PERIODE>&matiere=<MATIERE>
```
Parametres: 
* periode (optionnel) : Trimestre de l'année (A001, A002, A003)
* matiere (optionnel) : Code de la matiere 

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

### Reponse :
```json
{
  "devoir": "ie Kwyk",
  "codePeriode": "A002",
  "codeMatiere": "MATHS",
  "libelleMatiere": "MATHEMATIQUES",
  "codeSousMatiere": "",
  "typeDevoir": "Intérrogation Ecrite",
  "enLettre": false,
  "coef": "0.25",
  "noteSur": "20",
  "valeur": "16",
  "nonSignificatif": false,
  "date": "2020-12-01",
  "dateSaisie": "2020-12-09",
  "valeurisee": false,
  "moyenneClasse": "17.67",
  "minClasse": "12.00",
  "maxClasse": "20.00",
  "elementsProgramme": []
}
```
