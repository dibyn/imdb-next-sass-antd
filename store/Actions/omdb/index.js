import { IMDB_MOVIES_LIST } from './../../types';
import _ from 'underscore';
import { message } from 'antd';
import omdbApi from './../../../api/omdbApi';
export const imdbMoviesList = (data) => {
  return {
    type: IMDB_MOVIES_LIST,
    payload: data,
  };
};
let count = 0;
export const fetchMoviesList = (movieId, indx) => async (dispatch, getState) => {
  count++;
  let omdbData = { ...getState().omdbReducer };
  return omdbApi
    .listMovies(movieId)
    .then(async (res) => {
      if (res.status === 200) {
        let data = await res.data;
        omdbData[`moviesList_${indx}`] = data;
        await dispatch(imdbMoviesList(omdbData));
        return res;
      } else {
        res.data && res.data.error
          ? message.info(res.data.error.message)
          : message.info('Something went wrong, please try again later');
        omdbData.moviesList = res.data.error.message;
        await dispatch(imdbMoviesList(omdbData));
        return;
      }
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error.message);
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
