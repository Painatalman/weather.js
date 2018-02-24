const request = require('request')

const { googleAPIURL: URL } = require('./config')
/**
 * Get address, latitude and longitude data for a specific search location
 * 
 * @param {string} address the address location 
 * @param {function} callback a callback function to be called with the returning object as first parameter
 * @returns {object} data the returned data object, with 3 properties 
 * @returns {object} data the returned data object, with 3 properties 
 */
module.exports = function(address) {
  const encodedAddress = encodeURIComponent(address)
  
  return new Promise((resolve, reject) => {
    request({
      url: `${URL}?address=${encodedAddress}`,
      json: true
    }, (err, res, body) => {
      if (err) {
        reject(`there was an error: ${err}`)
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find the provided location')
      } else if (body.status === 'OK') {
        const {
          geometry,
          formatted_address: address
        } = body.results[0]

        const {
          lat: latitude,
          lng: longitude
        } = geometry.location

        // openWeather
        resolve({
          address,
          latitude,
          longitude
        })
      }
    })
  }) 
}