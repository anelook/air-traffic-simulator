const Kafka = require('node-rdkafka');
const dotenv = require('dotenv')
const getFlightsInProgress = require('./flights');
dotenv.config();

const producer = new Kafka.Producer({
    'metadata.broker.list': 'kafka-airplanes-dev-advocates.l.aivencloud.com:13041',
    'security.protocol': 'ssl',
    'ssl.key.location': process.env['ssl.key.location'],
    'ssl.certificate.location': process.env['ssl.certificate.location'],
    'ssl.ca.location': process.env['ssl.ca.location'],
    'dr_cb': true
})
producer.on('delivery-report', (error, report) => {
    console.log("delivery-report: ", report);
})

producer.on("ready", () => {
    setInterval(() => {
        const flights = getFlightsInProgress();

        flights.forEach(flight => {
            producer.produce(
                'flights-in-the-air',
                null,
                Buffer.from(JSON.stringify(flight)),
                flight.flight.flightNumber,
                Date.now()
            )
        });
        producer.flush();
    }, 1000)
})

producer.connect({}, (err) => {
    if (err) {
        console.log(err);
    }
})

