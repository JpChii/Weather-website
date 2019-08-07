const request = require('request')

const geocode = (address, callback) => {
    const uri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1IjoiamF5YXByYWthc2hkZXYiLCJhIjoiY2p5cmQyYzY3MDk5OTNicXluYmsyc25hcCJ9.t1VhAck1ogn6Q_xR23W-yA'
    setTimeout(() => {
        const locationData = request({uri, json : true}, (error,response) => {
            if(error){
                // console.log('please check connectivity!')
                //no data is passed so it's undefined to match when function is called
                callback('unable to connect to internet', undefined)
            }else if(response.body.features.length === 0){
                // console.log('place not found!')
                callback('Unable to find the location!', undefined)
            }else{
                // const latitude = response.body.features[0].center[0]
                // const longitude = response.body.features[0].center[1]
                callback(undefined, {
                    latitude : response.body.features[0].center[1],
                    longitude : response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })        
            }
        
        })
    },2000)
}

module.exports = geocode
