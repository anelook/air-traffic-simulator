const getFlightsInProgress = require('./flights')

const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 3000;
app.use(express.static('public'));

app.get('/aircraft-positions', (req, res) => {
    const flights = getFlightsInProgress();
    res.json(flights);
})

app.listen(port, () => {
    console.log('server is running');
})


