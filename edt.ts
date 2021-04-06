import * as ec from 'node-ecole-directe'

async function getEdt(elevePromise: Promise<ec.Eleve | ec.Famille>){
    let returnEdt: object[] = []
    await elevePromise.then(async compte => {
        const eleve = (compte as ec.Eleve)
        
    })
}