'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getMovies = require('./movies.js');
const getWeather = require('./weather.js');
//use
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

// Routes

const movieHandler = async function(request, response) {
  try{

    let city = request.query.city_name;
    let result = await getMovies(city)
    response.send(result)
  }catch(error){
    console.error(error);
  }
   
};

app.get('/movies', movieHandler);


app.get('/weather', getWeather);

app.get('*', (request, response) => {
  response.send('error');
});

//Listen-start the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));



