const express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
const livereload = require("livereload")
const connectLivereload = require("connect-livereload")

const PORT = process.env.PORT || 3000

const liveReloadServer = livereload.createServer()
liveReloadServer.watch(path.join(__dirname, 'web'))
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express()

app.use(connectLivereload())
app.use(express.static('web/public'))

var jsonParser = bodyParser.json()

// Serve pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/index.html'));
})

app.get('/second/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/pages/second_page.html'));
})

// API methods
app.post('/api/password/kuchen', jsonParser, (req, res) => {
  try {
    const pw = req.body.password
    console.log("Submitted password:", pw)
    if (pw === 'test') {
      return res.json({
        correct_pw: true,
        link: "/second/",
      })
    } else {
      return res.json({
        correct_pw: false,
        link: "",
      })
    }
  } catch {
    return res.status(400).json({ error: 'no password sent' })
  }
})

// Server setup
app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`)
})