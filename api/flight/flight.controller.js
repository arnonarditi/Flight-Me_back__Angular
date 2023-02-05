const flightService = require('./flight.service')
const logger = require('../../services/logger.service')

async function getFlights(req, res) {
  try {
    logger.debug('Getting Flights')
    let isOW = JSON.parse(req.query.isOW) 
    const flights = await flightService.query(isOW)

    res.json(flights)
  } catch (err) {
    logger.error('Failed to get flights', err)
    res.status(500).send({ err: 'Failed to get flights' })
  }
}

module.exports = {
  getFlights,
}
