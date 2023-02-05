const flightsOW = require('../../data/Raw_data OW.json')
const flightsRT = require('../../data/Raw_data RT - 2pax .json')

function query(isOW) {
    let cleanData
    if (isOW) {
        cleanData = _cleanData(flightsOW)
    } else {
        cleanData = _cleanData(flightsRT)
    }
    return Promise.resolve(cleanData)
}

function _cleanData(flights) {
    let cleanData = []
    flights.forEach(flight => {
        let { ID, Segments, AveragePrice, CurrencySymbol } = flight

        Segments = Segments.map(segment => {
            let { Legs, SegmentDuration, ValidatingCarrier } = segment

            Legs = Legs.map(leg => {
                const { DeparturePoint, ArrivalPoint, FlightNumber, AirlineName, AirlineCode } = leg
                return { DeparturePoint, ArrivalPoint, FlightNumber, AirlineName, AirlineCode }
            })
            return { Legs, SegmentDuration, ValidatingCarrier }
        })

        cleanData.push({ ID, Segments, AveragePrice, CurrencySymbol })
    })
    return cleanData
}

module.exports = {
    query
}

