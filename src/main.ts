import connection from "./connection"
import notes from "./notes"
import devoir from "./devoir"
import message from "./messagerie"
import e, {Request, Response, Express} from "express"
import bodyParser from "body-parser"
import {Matiere, Trimestre} from "../typesApi/typesNotesAndPeriode"

const app:Express = e()

async function nombreNotes(){
    await notes.getNotes({eleve: connection, matiere: "EPS"})
    .then(value => {
        console.log(value.length)
    })
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*") 
    next()
})

app.get("/", (req: Request, res: Response) => {
    res.header("Content-Type: text/html")
    res.send(
    "API Ecole Directe <a href=\"https://github.com/MarcJus/private-api-ecole-directe\">github</a>")
})

app.get("/notes",async (req: Request, res: Response) => {
    const query = req.query
    const matiere: string = query.matiere == undefined ?
     undefined : query.matiere.toString().toUpperCase()
    const periode: string = query.periode == undefined ?
     undefined : query.periode.toString().toUpperCase()
    const note: number = query.note == undefined ? undefined : Number(query.note)
    const higher: number = query.higher == undefined ? undefined : Number(query.higher)
    const lower: number = query.lower == undefined ? undefined : Number(query.lower)
    await notes.getNotes({eleve: connection, matiere: (matiere as Matiere)
        , periode: (periode as Trimestre), note: note, lower: lower, higher: higher})
    .then(value => {
        res.send(value)
    }).catch(err => {
        res.json({error: err})
    })
})

app.get("/notes/moyenne", async (req: Request, res: Response) => {
    const query = req.query
    if(query.periode != undefined){
        const periode = query.periode.toString()
        if(periode == "A001" || periode == "A002" || periode == "A003"){
            await notes.getMoyenne({eleve: connection, periode: periode}).then(value => {
                res.send(value)
            }).catch(err => {
                res.status(500).json({success: false, err: err})
            })
        } else {
            res.status(400).json({success: false, err: "Mauvaise periode"})
        }
    } else {
        res.status(400).json({success: false, err: "Periode non specifie"})
    }
})

app.get("/notes/moyenne/preview", async (req: Request, res: Response) => {
    const query = req.query
    if(query.periode != undefined){
        const periode = query.periode.toString()
        if(periode == "A001" || periode == "A002" || periode == "A003"){
            await notes.getPreMoyenne(connection).then(value => {
                res.send(value)
            }).catch(err => {
                res.status(500).send(err)
            })
        } else {
            res.status(400).json({success: false, err: "Mauvaise periode"})
        }
    } else {
        res.status(400).json({success: false, err: "Periode non specifie"})
    }
})

app.get("/fetchNotes", async (req: Request, res: Response) => {
    await notes.getNotesAndPeriode(connection).then(value => {
        res.json(value)
    })
})

app.get("/devoirs", async (req: Request, res: Response) => {
    const query = req.query
    const date: string = query.date == undefined ? undefined :
     query.date.toString().replace("/", "-").replace("/", "-")
    await devoir.getDevoir({eleve: connection, date: date}).then(value => {
        const reply: object[] = value
        res.json(reply)
    }).catch(err => {
        res.json({error: err})
    })
})

app.get("/messagerie", async (req: Request, res: Response) => {
    await message.getMessagerie(connection).then(value => {
        res.json(value)
    }).then(err => {
        res.send(err)
    })
})

app.get("/edt", async (req: Request, res:Response) => {
    res.send("Edt")
})

app.get("/shortcuts/devoirs", async (req: Request, res: Response) => {
    const reply = "test"
    const dates: string[] = []
    await devoir.getDevoir({eleve: connection})
    .then((value: object[]) => {
        value.forEach(devoirs => {
            const devoir: any = (devoirs as any)
            dates.push(devoir.day)
        })
    })
    dates.forEach(async (date: string) => {
        await devoir.getDevoir({eleve: connection, date: date})
        .then((value: object[]) => {
            const devoir: any = (value[0] as any)
            console.log(devoir.matiere)
        })
    })
    res.send(reply)
})
 
console.log("server start")
app.listen(8080)
