const express   = require('express')
const fetch     = require('node-fetch')
const app       = express()
require('dotenv').config()

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => console.log('live on port 3001'))
app.get('/', (req, res) => {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.apiKey}&per_page=2`)
        .then(res => res.json())
        .then(data => {
            res.send(data.objects)
          })
        .catch(err => console.log(err))
})

app.get('/artwork', (req, res) => {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.apiKey}&per_page=1`)
        .then(res => res.json())
        .then(data => {
            // I need to write a function here to handle the 2nd API call
            data.objects.forEach((art) => {
                let id = art.id
                fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=${process.env.apiKey}&id=${id}`)
                .then(res => res.json())
                .then(data => {
                    res.send(data)
                })
            })
        })
    
})

