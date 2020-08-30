const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=
    ${encodeURIComponent(lat)},${encodeURIComponent(lon)}&units=m`;

    request({ url, 'json': true }, (error, { body }) => {
        if(error){
            callback(`Unable to connect to weather service! Error: ${error.errno}`, undefined);
        } else if(body.error){
            callback(body.error.info, undefined);
        } else {
            const obj_res = {
                time: body.location.localtime,
                is_day: body.current.is_day,
                general: {
                    code: body.current.weather_code,
                    icon: body.current.weather_icons[0],
                    temperature: body.current.temperature,
                    feelslike: body.current.feelslike,
                    description: body.current.weather_descriptions[0]
                }, 
                rain: {
                    humidity: body.current.humidity,
                    cloudcover: body.current.cloudcover,
                    precip: body.current.precip
                },
                wind: {
                    speed: body.current.wind_speed,
                    degree: body.current.wind_degree,
                    dir: body.current.wind_dir,
                    pressure: body.current.pressure
                }
            };
            callback(undefined, obj_res);
        }
    });
}

module.exports = forecast