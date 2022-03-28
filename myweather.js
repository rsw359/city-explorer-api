'use strict';

const axios = require('axios');

async function getWeather(request, response) {

  let searchQueryLat = request.query.lat;
  let searchQueryLon = request.query.lon;

  let url = `http://api.weatherbit.io/v2.0/current?lat=${searchQueryLat}&lon=${searchQueryLon}&key=${process.env.WEATHER_API_KEY}`;

  let weatherBitData = await axios.get(url);

  // Promise.resolve(weatherBitData);

  let dataArray = weatherBitData.data.data.map(dailyCityData => new Forecast(dailyCityData));

  response.send(dataArray);

};
class Forecast {
  constructor(dailyCityData) {

    this.date = dailyCityData.datetime;
    this.description = dailyCityData.weather.description;

  }
}

module.exports = getWeather;
