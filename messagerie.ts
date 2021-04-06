import * as ec from 'node-ecole-directe'

async function getMessagerie(elevePromise: Promise<ec.Eleve | ec.Famille>){
    let returnMessagerie: object[] = [];
    await elevePromise.then(async compte => {
        const eleve:ec.Eleve = (compte as ec.Eleve);
        await eleve.fetchMessagerie().then(result => {
            let messages: object = (result as any).messages
            console.log(messages)
            returnMessagerie.push(result);
        }).catch(err => {
            console.log("erreur fetch")
            console.log(err)
        })
    }).catch(err => {
        console.log("erreur compte");
        console.error(err);
    })
    return returnMessagerie;
}

export default {
    getMessagerie
}