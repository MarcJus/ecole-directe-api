import * as ec from 'node-ecole-directe';

async function getEdt(elevePromise: Promise<ec.Eleve | ec.Famille>){
    const returnEdt: object[] = [];
    await elevePromise.then(async compte => {
        const eleve = (compte as ec.Eleve);
        
    });
}