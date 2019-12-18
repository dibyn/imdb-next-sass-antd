import Axios from 'axios';
const apiKey = '5278dfea';
class omdbApi {
  static async listMovies(movieId) {
    const response = await Axios({
      method: 'GET',
      url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`,
    });
    return response;
  }
  static async searchMovies(searchVal) {
    const response = await Axios({
      method: 'GET',
      url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchVal}&plot=full`,
    });
    return response;
  }
}
export default omdbApi;
