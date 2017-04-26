const path = require('path')
const express = require('express')
const compression = require('compression')
const app = express()

app.set('port', process.env.PORT || 8080)

app.use(compression())
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Server live on port ${app.get('port')}`)
})
