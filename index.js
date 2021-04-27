const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

var jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  res.json({connection: 'OK'})
})

app.post('/kuchen/password', jsonParser, (req, res) => {
  try {
    const pw = req.body.password
    console.log(pw)
    if (pw === 'test') {
      res.json({
        link: "test",
      })
    } else {
      return res.status(400).json({ error: 'wrong password' })
    }
  } catch {
    return res.status(400).json({ error: 'no password sent' })
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})