const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Holly Culver'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Holly Culver'
    })
})

app.get('/weather', (req, res) => {
    //const address = req.query.address
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({

                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'You obviosuly need help!',
        name: 'Holly Culver'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        message: 'Help article not found.',
        name: 'Holly Culver'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        message: 'Page not found.',
        name: 'Holly Culver'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})