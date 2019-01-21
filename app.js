const express   = require('express')
const fetch     = require('node-fetch')
const cors      = require('cors')

const app       = express()

require('dotenv').config()

app.use(cors())

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => console.log('live on port 3001'))

app.get('/', (req, res) => {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.API_KEY}&per_page=50`)
        .then(res => res.json())
        .then(data => {
            res.send(data)
          })
        .catch(err => console.log(err))
})

app.get('/:artwork_id', (req, res) => {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=${process.env.API_KEY}&id=${req.params.artwork_id}`)
        .then(res => res.json())
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})    
