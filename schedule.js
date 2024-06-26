const fs = require('fs');

// Airport codes and names (you can expand this list as needed)
const airportsData = require('./airports.json');

const airports = Object.values(airportsData).map(airport => ({
    code: airport.code,
    name: airport.name
}));
// Aircraft types
const aircraftTypes = [
    "Airbus A320",
    "Airbus A321",
    "Airbus A319",
    "Boeing 737",
    "Boeing 767",
    "Boeing 747",
    "Boeing 777",
    "Boeing 787 Dreamliner",
    "Airbus A330",
    "Airbus A350",
    "Embraer E190",
    "Bombardier CRJ900",
    "McDonnell Douglas MD-80",
    "Cessna Citation X",
    "Gulfstream G650",
    "Boeing 737",
    "Boeing 747",
    "Boeing 757",
    "Boeing 767",
    "Boeing 777"
];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function getRandomTimeWithSeconds(startTime, endTime) {
    // Convert start and end times to seconds since midnight
    const startParts = startTime.split(':').map(Number);
    const endParts = endTime.split(':').map(Number);

    const startSeconds = startParts[0] * 3600 + startParts[1] * 60 + startParts[2];
    const endSeconds = endParts[0] * 3600 + endParts[1] * 60 + endParts[2];

    // Generate a random number of seconds between start and end times
    const randomSeconds = getRandomInt(startSeconds, endSeconds);

    // Convert random seconds back to hours, minutes, and seconds
    const hours = Math.floor(randomSeconds / 3600);
    const minutes = Math.floor((randomSeconds % 3600) / 60);
    const seconds = randomSeconds % 60;

    // Format hours, minutes, and seconds into a time string
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}
// Function to generate a flight schedule
function generateFlightSchedule(numFlights) {
    const schedule = [];

    for (let i = 0; i < numFlights; i++) {
        const departureTime = getRandomTimeWithSeconds("00:00:00", "23:59:59");//departureTimes[getRandomInt(0, departureTimes.length)];
        const departureAirport = airports[getRandomInt(0, airports.length)].code;
        let destinationAirport = airports[getRandomInt(0, airports.length)].code;

        // Ensure destination airport is different from departure airport
        while (destinationAirport === departureAirport) {
            destinationAirport = airports[getRandomInt(0, airports.length)].code;
        }

        const aircraft = aircraftTypes[getRandomInt(0, aircraftTypes.length)];
        const flightNumber = generateFlightNumber();

        schedule.push({
            departureTime: departureTime,
            departureAirport: departureAirport,
            destinationAirport: destinationAirport,
            aircraft: aircraft,
            flightNumber: flightNumber
        });
    }

    return schedule;
}

// Function to generate a random flight number in the format XXnnn (e.g., BA101)
function generateFlightNumber() {
    const airlineCodes = ["BA", "KL", "IB", "LH", "AF", "AZ", "TP", "A3", "VY"];
    const number = getRandomInt(100, 1000);
    const airlineCode = airlineCodes[getRandomInt(0, airlineCodes.length)];
    return airlineCode + number;
}

const flights = generateFlightSchedule(16000);

// Write the generated flight schedule to a JSON file
fs.writeFileSync('schedule.json', JSON.stringify(flights, null, 2));

console.log('Flight schedule saved');
