const yargs = require('yargs')

const geocodeAddress = require('./geocode/geocode')
const getWeather = require('./weather/weather')

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

geocodeAddress(argv.a)
  .then((coordinates) => {
    const { latitude, longitude } = coordinates
    return getWeather(latitude, longitude)
  })
  .then((weatherData) =>{
    console.log(weatherData)
  })
  .catch(e => {throw new Error(e)})

