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
    let note: number = query.note == undefined ? undefined : Number(query.note);
    let higher: number = query.higher == undefined ? undefined : Number(query.higher);
    let lower: number = query.lower == undefined ? undefined : Number(query.lower);
    await notes.getNotes({eleve: connection, matiere: matiere, periode: periode, note: note, lower: lower, higher: higher})
    .then(value => {
        res.send(value);
    }).catch(err => {
        res.json({error: err})
    })
})

app.get("/notes/moyenne", async (req: e.Request, res: e.Response) => {
    let query = req.query;
    if(query.periode != undefined){
        let periode = query.periode.toString();
        if(periode == "A001" || periode == "A002" || periode == "A003"){
            await notes.getMoyenne({eleve: connection, periode: periode}).then(value => {
                res.json(value)
            }).catch(err => {
                res.end(err)
            })
        } else {
            res.json({success: false, err: "Mauvaise periode"})
        }
    } else {
        res.json({success: false, err: "Periode non specifie"})
    }
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
