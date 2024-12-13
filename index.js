const express = require('express');
const axios = require('axios');
const cors = require('cors');

const bodyparser = require('body-parser');

const app = express();

const cors_initial = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
}

app.use(express.json());
app.use(cors(cors_initial));

app.get('/getprice', async(req, res) => {
    const url = `https://v6.exchangerate-api.com/v6/d63b755d4016ee72f2529a1b/latest/USD`;

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", "goldapi-3z6sm37lnxmf-io");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        // const response = await axios.get(url);
        // const xauPrice = response.data.conversion_rates;
        // res.json({price : xauPrice})
        //  const data = await fetch("https://www.goldapi.io/api/XAU/USD", requestOptions);
        // console.log(data.data);
        // res.json({price : data.price})
        let price = 5;
        await fetch("https://www.goldapi.io/api/XAU/USD", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            res.json({price : result})
        })
        .catch(error => console.log('error', error));


    } catch (error) { 
        console.error('Error fetching the Bitcoin price:', error.response ? error.response.data : error.message);
    }
});


app.listen(5000, () => {
    console.log("Hello World");
})