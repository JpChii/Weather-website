const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'JpNaara'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'JpNaara'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name:'JpNaara'
    })
})

//JSON HTTP endpoint
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
           error: 'provide a location to search'
        })
    }

    //{} empty array is default parameter, coz no param for address will cause app to crash due to destructuring
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {forecast}) => {
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help page not found',
        name: 'JpNaara'

    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: '404 page not found',
        name: 'JpNaara'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})