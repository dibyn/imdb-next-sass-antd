import { IMDB_MOVIES_LIST } from './../../types';
import _ from 'underscore';
import { message } from 'antd';
import omdbApi from './../../../api/omdbApi';
const apiUrl = 'http://www.omdbapi.com';
const apiKey = '5278dfea'
const listMovieApiUrl = `${apiUrl}/?apikey=${apiKey}&t=Avengers&plot=full`
export const imdbMoviesList = (data) => {
  return {
    type: IMDB_MOVIES_LIST,
    payload: data,
  };
};
export const fetchMoviesList = (payload) => async (dispatch, getState) => {
  // dispatch(loader(true));
    let omdbData = { ...getState().omdbReducer };
    console.log(listMovieApiUrl, 'listMovieApiUrl');
  return omdbApi
    .listMovies(listMovieApiUrl)
    .then(async (res) => {
      if (res.status === 200) {
        let data = await res.data;
        omdbData.moviesList = data;
        await dispatch(imdbMoviesList(omdbData));
        // dispatch(loader(false));
        return res.data;
      } else {
        res.data && res.data.error
          ? message.info(res.data.error.message)
          : message.info('Something went wrong, please try again later');
        omdbData.moviesList = res.data.error.message;
        await dispatch(imdbMoviesList(omdbData));
        // dispatch(loader(false));
        return;
      }
    })
      .catch((error) => {
        console.log(error && error.response, 'error.response');
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error.message);
        // dispatch(loader(false));
      } else {
        message.error('Request to fetch data failed');
      }
    });
};

export const loader = (bool) => (dispatch, getState) => {
  let omdbData = { ...getState().omdbReducer };
  omdbData.loader = bool;
  dispatch(imdbMoviesList(omdbData));
};
