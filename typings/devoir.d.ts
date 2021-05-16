import * as ec from "node-ecole-directe";
declare namespace Devoir {
    function getDevoir(properties: PropertiesDevoir): Promise<object[]>;
    function removeHtmlTag(text: string): string;
    function decodeText(text: string): string;
    interface PropertiesDevoir {
        eleve: Promise<ec.Eleve | ec.Famille>;
        date?: string;
    }
}
export = Devoir;
