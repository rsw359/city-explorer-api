'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
let weatherData = require('./data/weather.json');
// let data = require('data/weather.json');

//use
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// Routes

app.get('/weather', async (request, response) => {

  let searchQueryLat = request.query.lat

  let searchQueryLon = request.query.lon

  let url = `http://api.weatherbit.io/v2.0/current?lat=${searchQueryLat}&lon=${searchQueryLon}&key=${process.env.WEATHER_API_KEY}`

  let weatherBitData = await axios.get(url);
  // console.log(weatherBitData.data);
  let dataArray = weatherBitData.data.data.map(dailyCityData => new Forecast(dailyCityData));
  console.log(dataArray)
  response.send(dataArray);
  
});

app.get('/movies', async (request, response) => {

  let city = request.query.city_name

  let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&total_results=3`);
    console.log(url);
    let moviesData = await axios.get(url);
  console.log(moviesData.data);
  let movieArray = moviesData.data.results.map(cityMovieData => new Movie(cityMovieData));
  response.send(movieArray);

});

app.get('*', (request, response) => {
  response.send('error');
});

//Listen-start the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


class Forecast {
  constructor(dailyCityData) {

    this.date = dailyCityData.datetime;
    this.description = dailyCityData.weather.description;

  }
}

class Movie {
  constructor(cityMovieData) {
   
    this.title = cityMovieData.title
    this.pic = cityMovieData.poster_path
    
  }
  
}
