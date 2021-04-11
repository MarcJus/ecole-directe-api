const EcoleDirecte = require("node-ecole-directe");
const login = require("./login.json");
const express = require("express")

const session = new EcoleDirecte.Session();
const connexion = session.connexion(login.username, login.password);

function getNotes(){
    connexion.then((compte) => {
        const notes = compte.fetchNotes().then(value => {
            value.notes.forEach(note => {
                if(note.codePeriode == "A002" && note.codeMatiere == "TECHN"){
                    let notesTechno = [];
                    notesTechno.push({nom: note.devoir, note: note.valeur, date: note.date})
                }
            });
        });
    }).catch(err => {
        throw err
    });
}

getNotes();
