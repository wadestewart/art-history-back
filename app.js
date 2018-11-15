const express   = require('express')
const fetch     = require('node-fetch')
const app       = express()
require('dotenv').config()

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => console.log('live on port 3001'))
app.get('/', (req, res) => {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.apiKey}&per_page=25`)
        .then(res => res.json())
        .then(data => {
            res.send(data.objects)
          })
        .catch(err => console.log(err))
})

app.get('/artwork', (req, res) => {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.apiKey}&per_page=5`)
        .then(res => res.json())
        .then(data => {
            const ids = []
            const responses = []
            const compReqs = 0
            data.objects.forEach((art) => {
                ids.push(art.id)
            })
            // console.log(ids)
            ids.forEach((artId) => {
                let id = artId
                console.log(id)
                // fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=${process.env.apiKey}&id=${id}`)
                // .then(res => res.json())
                // .then(data => {
                //     console.log(data)
                //     res.send(data)
                // })
            })
        })
        .catch(err => console.log(err))    
})

