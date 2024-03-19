const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flightsArray = flights.split('+');
console.log(flightsArray);
for (flight of flightsArray) {
  const [status, from, to, time] = flight.split(';');
  const airportNormalizer = function (airport) {
    return airport.slice(0, 3).toUpperCase();
  };
  const flightStatus = status.replaceAll('_', ' ');
  const delayedMarker = flightStatus.startsWith(' Delayed') ? '🔴' : '';
  const fromAirport = airportNormalizer(from);
  const toAirport = airportNormalizer(to);
  const flightTime = time.replace(':', 'h');
  const output =
    `${delayedMarker}${flightStatus} from ${fromAirport} to ${toAirport} (${flightTime})`.padStart(
      45
    );
  console.log(output);
}
