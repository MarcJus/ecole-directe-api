import * as ec from 'node-ecole-directe';
declare function getDevoir(properties: PropertiesDevoir): Promise<object[]>;
interface PropertiesDevoir {
    eleve: Promise<ec.Eleve | ec.Famille>;
    date?: string;
}
declare const _default: {
    getDevoir: typeof getDevoir;
};
export default _default;
