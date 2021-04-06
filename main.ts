import connection from './connection'
import notes from './notes'
import devoir from './devoir'
import message from './messagerie'
import e from 'express'
import bodyParser from 'body-parser'

const app:e.Express = e()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (req: e.Request, res: e.Response) => {
    console.log("requete");
    res.end();
})

app.get("/notes",async (req: e.Request, res: e.Response) => {
    let query = req.query;
    let matiere: string = query.matiere == undefined ? undefined : query.matiere.toString().toUpperCase();
    let periode: string = query.periode == undefined ? undefined : query.periode.toString().toUpperCase();
    await notes.getNotes({eleve: connection, matiere: matiere, periode: periode})
    .then(async value => {
        let reply: object[] = value
        res.json(value);
    }).catch(err => {
        res.json({error: err})
    })
})

app.get("/devoirs", async (req: e.Request, res: e.Response) => {
    let query = req.query;
    let date: string = query.date == undefined ? undefined : query.date.toString().replace("/", "-").replace("/", "-");
    await devoir.getDevoir({eleve: connection, date: date}).then(value => {
        let reply: object[] = value
        res.json(reply);
    }).catch(err => {
        res.json({error: err});
    })
})

app.get("/messagerie", async (req: e.Request, res: e.Response) => {
    await message.getMessagerie(connection).then(value => {
        res.json(value)
    }).then(err => {
        res.send(err);
    })
})

app.get("/edt", async (req: e.Request, res:e.Response) => {
    res.send("Edt");
})

app.get("/shortcuts/devoirs", async (req: e.Request, res: e.Response) => {
    let reply: string = "test";
    let dates: string[] = [];
    await devoir.getDevoir({eleve: connection})
    .then((value: object[]) => {
        value.forEach(devoirs => {
            let devoir: any = (devoirs as any);
            dates.push(devoir.day)
        })
    })
    dates.forEach(async (date: string) => {
        await devoir.getDevoir({eleve: connection, date: date})
        .then((value: object[]) => {
            let devoir: any = (value[0] as any);
            console.log(devoir.matiere)
        })
    })
    res.send(reply);
});
 
console.log("server start")
app.listen(8080);
