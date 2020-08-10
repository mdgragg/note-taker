const path = require("path");
const express = require("express")
const fs = require("fs");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    fs.readFile ('./db/db.json', 'utf8', function(err, data){
      if (err) throw err
      var note = JSON.parse(data)
     res.json(note)
  })
  });

  app.post("/api/notes", function(req, res) {

    var newNote = req.body
    fs.readFile('./db/db.json', 'utf8', function(err,data){
        if(err) throw err
        var note = JSON.parse(data)
        note.push(newNote)
        note.forEach((item, i) => item.id = i + 1)
           fs.writeFile('./db/db.json', JSON.stringify(note), 'utf8', function(err){
           if(err) throw err
           console.log('Posted note!')
       } )

    })
    res.json(newNote)
  });


  app.delete('/api/notes/:id', function (req, res) {
    var chosenNote = req.params.id
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err
        var note = JSON.parse(data)
        var index = parseInt(chosenNote) - 1
        note.splice(index, 1);
        fs.writeFile('./db/db.json', JSON.stringify(note), 'utf8', function (err) {
            if (err) throw err
            console.log('Deleted note!')
        })
    })
    res.send(chosenNote)
})


};
