const request = require('request')

const { openWeatherAPIKey: API_KEY, openWeatherURL: URL } = require('./config')

module.exports = function getWeatherData(latitude, longitude) {
  return new Promise((resolve, reject) => {
    request({
      url: `${URL}?appid=${API_KEY}&lat=${latitude}&lon=${longitude}`,
      json: true
    }, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve(body.main)
      } else {
        reject(`unable to fetch weather: ${err && err || res.statusCode}`)
      }
    })
  })
}
