const yargs = require('yargs')
const axios = require('axios')

const { googleAPIURL } = require('./geocodeConfig')


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

axios.get(
  `${googleAPIURL}?address=${encodeURIComponent(argv.a)}`
).then( geocodeData => {
  if (geocodeData.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address')
  }

  if (geocodeData.data.error_message) {
    throw new Error(`Error with google API: ${geocodeData.data.error_message}`)
  }

  const {
    lat: latitude,
    lng: longitude
  } = geocodeData.data.results[0].geometry.location

  const { openWeatherAPIKey, openWeatherURL } = require('./weatherConfig')

  return axios.get(
    `${openWeatherURL}?appid=${openWeatherAPIKey}&lat=${latitude}&lon=${longitude}`
  )
}).then((weatherData) => {
  console.log(weatherData.data.main)
}).catch(e => { 
  throw new Error(e) 
})
