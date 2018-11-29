const express   = require('express')
const fetch     = require('node-fetch')
const cors      = require('cors')

const app       = express()

require('dotenv').config()

app.use(cors())

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => console.log('live on port 3001'))

app.get('/', (req, res) => {
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.apiKey}&per_page=3`)
        .then(res => res.json())
        .then(data => {
            res.send(data)
          })
        .catch(err => console.log(err))
})

app.get('/:artwork_id', (req, res) => {
    console.log(req.params.artwork_id)
    fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=${process.env.apiKey}&id=${req.params.artwork_id}`)
        .then(res => res.json())
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})

// fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.apiKey}&per_page=75`)
//     .then(res => res.json())
//     .then(data => {
//         const ids = []
//         const urls = []
//         data.objects.forEach((art) => {
//             ids.push(art.id)
//         })
//         ids.forEach((url) => {
//             urls.push(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=${process.env.apiKey}&id=` + url)
//         })
//         app.get('/artwork', (req, res) => {
//             Promise.all(urls.map(url =>
//                 fetch(url)
//                     .then(res => {
//                         if (res.status === 200) {
//                             console.log('Success!')
//                             return res.json()
//                         } else {
//                             console.log('Request Denied!')
//                         }
//                     })
//                     .catch(err => console.log(err))
//                 ))
//                 .then(data => {
//                     console.log(data)
//                     res.send(data)
//                 })
//         })
//     })
//     .catch(err => console.log(err))    
    
    
