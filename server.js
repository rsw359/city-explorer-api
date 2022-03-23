'use strict';
// const e = require('express');
const express = require('express');
require('./.env');
require('dotenv').config();
let weatherData = require('./data/weather.json');
// let data = require('data/weather.json');

//use
const app = express();

const PORT = process.env.PORT || 3002;

// Routes

app.get('/weather', (request, response) => {
  let searchQuery = request.query.city_name;
  let cityData = weatherData.find(city => city.city_name.toUpperCase() === searchQuery.toUpperCase());

  let dataArray= cityData.data.map(dailyCityData => new Forecast(dailyCityData));
  response.send(dataArray);
});

app.get('*', (request, response) => {
  response.send('error');
});

//Listen-start the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


class Forecast {
  constructor(dailyCityData){

    this.date = dailyCityData.valid_date;
    this.description = dailyCityData.weather.description;
  }
}
