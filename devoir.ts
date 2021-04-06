import * as ec from 'node-ecole-directe'
import ent from 'ent'

async function getDevoir(properties: PropertiesDevoir): Promise<object[]>{
    let returnDevoir: object[] = new Array<object>();
    const elevePromise = properties.eleve
    await elevePromise.then(async compte => {
        const eleve: ec.Eleve = (compte as ec.Eleve);
        if(properties.date != undefined){
            await eleve.fetchCahierDeTexteJour(properties.date)
            .then(value => {
                value.forEach(devoirs => {
                    let devoir = (devoirs as any);
                    let contenuEncoded:string = devoir.matiere.aFaire.contenu;
                    if(contenuEncoded != undefined)
                        devoir.matiere.aFaire.contenu = decodeText(contenuEncoded)
                    if(devoir.matiere.contenuDeSeance != undefined){
                        if(devoir.matiere.contenuDeSeance.contenu != ''){
                            let seanceEncoded:string = devoir.matiere.aFaire.contenuDeSeance.contenu;
                            let decoded: string = decodeText(seanceEncoded);
                            devoir.matiere.aFaire.contenuDeSeance.contenu = decoded
                            devoir.matiere.contenuDeSeance.contenu = decoded;
                        }
                    }
                    returnDevoir.push(devoir);
                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            await eleve.fetchCahierDeTexte()
            .then(value => {
                value.forEach(devoirs => {
                    let devoir: any = (devoirs as any);
                    returnDevoir.push(devoir);
                })
            }).catch(err => {
                console.log(err);
            })
        }
    })
    return returnDevoir;
}

function removeHtmlTag(text: string): string{
    text = text.toString();
    return text.replace(/<[^>]*>/g, "").replace("\n", "");
}

function decodeText(text: string): string{
    let buffer: Buffer = Buffer.from(text, "base64");
    return removeHtmlTag(ent.decode(buffer.toString('utf-8')));
}

interface PropertiesDevoir{
    eleve: Promise<ec.Eleve | ec.Famille>,
    date?: string
}

export default {
    getDevoir,
}