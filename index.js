// The file I'll be using to write my code in
const crypto = require("crypto");
const cors = require('cors');

const express = require('express');
const app = express();
const PORT = 8080;

// req = incoming data
// res = outgoing data
// We run this function whenever the '/tshirt' ROUTE is requested

app.use(cors()); // Enable CORS for all origins
app.use( express.json() ) //Apply middleware

// For Vercel deployment
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(
        PORT,
        () => console.log(`It's alive! on http://localhost:${PORT}`)
    );
}

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: '👕',
        size: 'large'
    })
});

// Route Params: (:id) we can capture dynamic values in the URL
app.post('/tshirt/:id', (req, res) => {

    const { id } = req.params;
    const { logo } = req.body; // BODY NOT PARSED YET

    // NOTE: Express does NOT parse JSON in the Body BY DEFAULT
    // WE need to setup MIDDLEWARE, to parse the JSON before hits the below 

    if ( !logo ) {
        return res.status(418).send({ message: 'Logo is required, dumbell!' })
    }

    res.send({
        tshirt: `👕 with your ${logo} and ID of ${id}`
    })

})


app.get('/zar-dollar-er', async (req, res) => {

    const extApiUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
    const response = await fetch(extApiUrl);

    const data = await response.json();
    const zarRate = data.usd.zar

    res.status(200).send({
        exchangeRate: zarRate,
        currencyPair: "USD/ZAR",
        lastUpdated: data.date
    })
});


app.post('/token', (req, res) => {

    const { username, password } = req.body;

    if (!username) {
        return res.status(401).send({ message: 'Invalid login credentials' });
    }

    if (!password) {
        return res.status(401).send({ message: 'Invalid login credentials' });
    }

    if (password === "Password@2025!") {
        const guid = crypto.randomBytes(16).toString("hex");
        res.send({
            token: `${guid}`
        });
    } else {
        res.status(401).send({ message: 'Invalid login credentials' });
    }

})


