const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //object shorthanding
    const uri = 'https://api.darksky.net/forecast/469b212f396cd4d2883958a56b0b56a1/' + latitude + ',' + longitude + '?units=si'
    setTimeout(()=>{
        request({uri, json: true}, (error, response) => {
            if(error){
                callback('Unable to connect to weather service!', undefined);
            }else if (response.body.error){
                callback('Cannot find location', undefined)
            }else{
                callback(undefined, {
                    forecast:'Its ' + response.body.daily.data[2].summary + ' The temeparture is ' 
                    + response.body.currently.temperature + ' degree. There is a ' 
                    + response.body.currently.precipProbability + '% chance of rain' + ' The high temperature for today is ' 
                    + response.body.daily.data[0].temperatureHigh + 'degree'
                })
            }
        })
    },2000)
   
}

module.exports = forecast