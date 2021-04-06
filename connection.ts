import * as ec from 'node-ecole-directe'
import * as login from './login.json'

const session: ec.Session = new ec.Session();
const connection: Promise<ec.Eleve | ec.Famille> = session.connexion(login.username, login.password);

export default connection;
