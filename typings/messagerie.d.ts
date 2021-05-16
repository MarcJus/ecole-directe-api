import ec from "node-ecole-directe";
declare namespace Messagerie {
    function getMessagerie(elevePromise: Promise<ec.Eleve | ec.Famille>): Promise<object[]>;
}
export = Messagerie;
