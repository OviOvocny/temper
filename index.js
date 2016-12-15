'use strict'

const port = process.env.PORT || 3000;

const db = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(bodyParser.json())

///

const remoteDB = {
  host     : 'eu-cdbr-west-01.cleardb.com',
  user     : 'b3f43c523c132a',
  password : '8ed0afab',
  database : 'heroku_fbdb800b3c02e7f'
}

const localDB = {
  host     : 'localhost',
  user     : 'ovi',
  password : 'kok',
  database : 'temper'
}

const conn = db.createConnection(localDB)

conn.connect()

// GET

app.get('/', (req, res) => {
  res.redirect('/temp')
})

app.get('/temp/:id?', (req, res) => {
  let query = req.params.id ? `SELECT * FROM dataset WHERE id=${req.params.id}` : `SELECT * FROM dataset ORDER BY id DESC LIMIT 1`
  conn.query(query, (err, rows, fields) => {
    conn.query("SELECT id, name FROM dataset", (err, options, fields) => {
      res.render('index', {
        index: true,
        rows: options,
        name: rows[0] ? rows[0].name : "Bez názvu",
        dataMin: rows[0] ? JSON.parse(rows[0].min) : 0,
        dataMax: rows[0] ? JSON.parse(rows[0].max) : 0
      })
    })
  })
})

app.get('/data', (req, res) => {
  conn.query("SELECT * FROM dataset ORDER BY id DESC", (err, rows, fields) => {
    res.render('data', {
      data: true,
      rows: rows
    })
  })
})

app.get('/set', (req, res) => {
  res.render('set')
})

// POST

app.post('/updateSet', (req, res) => {
  const b = req.body
  conn.query("UPDATE dataset SET min=?, max=? WHERE id=?", [JSON.stringify(b.min), JSON.stringify(b.max), b.targetId], err => {
    if (err) throw err
  })
})

app.post('/updateName', (req, res) => {
  const b = req.body
  conn.query("UPDATE dataset SET name=? WHERE id=?", [b.name, b.targetId], err => {
    if (err) throw err
  })
})

app.post('/newSet', (req, res) => {
  conn.query("INSERT INTO dataset (name, min, max) VALUES ('-', '[]', '[]')", err => {
    if (err) throw err
  })
})

// LISTEN

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
