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

// I need to build an array of concatenated urls for API calls for individual objects
fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${process.env.apiKey}&per_page=5`)
    .then(res => res.json())
    .then(data => {
        const ids = []
        const urls = []
        // let compReqs = 0
        data.objects.forEach((art) => {
            ids.push(art.id)
        })
        ids.forEach((url) => {
            urls.push(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=${process.env.apiKey}&id=` + url)
        })
        // console.log(urls)
        app.get('/artwork', (req, res) => {
            Promise.all(urls.map(url =>
                fetch(url)
                    .then(res => {
                        if (res.status === 200) {
                            console.log('Success!')
                            return res.json()
                        } else {
                            console.log('Request Denied!')
                        }
                    })
                    .catch(err => console.log(err))
                ))
                .then(data => {
                    console.log(data)
                    res.send(data)
                })
        })



        // urls.forEach((url) => {
        //     const responses = []
        //     app.get('/artwork', (req, res) => {
        //         fetch(url)
        //             .then(res => res.json())
        //             .then(data => {
        //                 console.log(data)
        //                 responses.push(data)
        //                 compReqs ++
        //                 if (compReqs === urls.length) {
        //                     console.log(responses)
        //                     // res.send(data)
        //                 }
        //             })
        //     })
        // })
    })
    .catch(err => console.log(err))    
    
    
