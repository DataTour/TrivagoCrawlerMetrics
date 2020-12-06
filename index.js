const express = require('express')

const app = express()

const cheerio = require('cheerio')

const rp = require('request-promise')

app.get('/', (req, res) => {
    res.status(200).json({ success: 'Trivado Api Online' })
})

app.get('/v1?url=', async(req, res) => {
    const url = req.query.url

    const config = {
        uri: url,
        transform: async function (body) {
            return  await cheerio.load(body)
          }
        }

    rp(config).then($ => {
        const name = $('.name__copytext').text()
        const address = $('.location-details').text()
        const rating = $('rating-pill').text()

        res.status(200).json({
            name,
            address,
            rating
        })
    })
})

app.listen(3001, () => {
    console.log({success:'iniciadoo'})
})
