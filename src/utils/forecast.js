const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=201a425f8bbbfe1c2d05c6a356471a2e&query=' + lat + ',' + long + '&units=f'
    //console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (error) {
            callback('Unable to find location weather.', undefined)
        } else {
            callback(undefined,
                'It is currently ' + body.current.weather_descriptions[0] + '. The temperature is ' + body.current.temperature + '. It feels like ' + body.current.feelslike + '.'
            )


        }
    })
}

module.exports = forecast