'use strict';

const axios = require('axios');

const getMovies = async function (location) {


  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}&total_results=3`;

  let moviesData = await axios.get(url)
  let movieArray = moviesData.data.results.map(cityMovieData => new Movie(cityMovieData));
  console.log(moviesData.data.results);
    return movieArray;
};


class Movie {
  constructor(cityMovieData) {

    this.title = cityMovieData.title;
    this.pic = cityMovieData.poster_path ? cityMovieData.poster_path : '';
    this.description = cityMovieData.overview;
    this.release = cityMovieData.release_date;
    this.popularity = cityMovieData.popularity;
    
    

  }

}

module.exports = getMovies;
