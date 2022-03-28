'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weakSausse = require('./modules/weather');


// const weather = require('./modules/weather.js');
const app = express();

app.get('/weather', weatherHandler);
app.use(cors());
const PORT = process.env.PORT || 3002;

function weatherHandler(request, response) {
  let lat = request.query.lat;
  let lon = request.query.lon;

  weakSausse.getWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
