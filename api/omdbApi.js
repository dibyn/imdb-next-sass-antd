import Axios from 'axios';
class omdbApi {
  static async listMovies(url) {
    const response = await Axios({
      method: 'GET',
      url: url,
      withCredentials: true,
      validateStatus: function(status) {
        return status >= 200 && status < 401; // default
      },
    });
    return response;
  }
  static async searchMovies(url) {
    const response = await Axios({
      method: 'GET',
      url: url,
      withCredentials: true,
      validateStatus: function(status) {
        return status >= 200 && status < 401; // default
      },
    });
    return response;
  }
}
export default omdbApi;
