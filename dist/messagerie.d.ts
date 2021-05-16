import * as ec from 'node-ecole-directe';
declare function getMessagerie(elevePromise: Promise<ec.Eleve | ec.Famille>): Promise<object[]>;
declare const _default: {
    getMessagerie: typeof getMessagerie;
};
export default _default;
