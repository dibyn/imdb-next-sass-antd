import Axios from 'axios';
class omdbApi {
  static async listMovies(url) {
    const response = await Axios({
      method: 'GET',
      url: url,
    });
    return response;
  }
  static async searchMovies(url) {
    const response = await Axios({
      method: 'GET',
      url: url,
    });
    return response;
  }
}
export default omdbApi;
