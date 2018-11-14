const express   = require('express')
const fetch     = require('node-fetch')
const app       = express()
require('dotenv').config()

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => console.log('live on port 3001'))
// console.log(process.env.apiKey)
app.get('/', (req, res) => {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.apiKey}&per_page=1`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            res.send(data)
          })
        // .then(res.send('Hello World'))
        .catch(err => console.log(err))
})
