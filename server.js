const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 8100

process.title = 'gold-admin'

app.use(express.static(path.join(__dirname, 'dist')))

require('./apply-routes')(app)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
})

app.listen(port, err => {
    if (err) {
        console.error(err)
    } else {
        console.log('Server listening on port ' + port)
    }
})
