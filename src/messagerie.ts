import ec from "node-ecole-directe"

namespace Messagerie{
    export async function getMessagerie
    (elevePromise: Promise<ec.Eleve | ec.Famille>): Promise<object[]>{
        const returnMessagerie: object[] = []
        await elevePromise.then(async compte => {
            const eleve:ec.Eleve = (compte as ec.Eleve)
            await eleve.fetchMessagerie().then(result => {
                const messages: object = (result as any).messages
                console.log(messages)
                returnMessagerie.push(result)
            }).catch(err => {
                console.log("erreur fetch")
                console.log(err)
            })
        }).catch(err => {
            console.log("erreur compte")
            console.error(err)
        })
        return returnMessagerie
    }
}

export = Messagerie