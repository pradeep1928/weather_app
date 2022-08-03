const request = require('request');

const forecast = (address, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=6e1f29647e7b1289cd33241c5e112c55&query=${address}&units=m`

    request({url: url, json:true}, (error, {body}) => {
        if (error) {
            cb('Unable to connect to weather service.', undefined)
        } else if(body.error) {
            cb('Unable to find location.', undefined)
        } else {
            cb(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature
    
            })
        }
    })
    }


module.exports = forecast;