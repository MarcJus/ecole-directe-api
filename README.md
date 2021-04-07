# ecole-directe-api

API utilisant le module [node-ecole-directe](https://github.com/Androz2091/node-ecole-directe) et le module [express](https://github.com/expressjs/express)

## Devoirs

2. Avec date

La date doit être au format YYYY-MM-DD

```http
GET /devoirs?date=date
```
   Reponse
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
