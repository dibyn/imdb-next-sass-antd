import { IMDB_MOVIES_LIST } from './../../types';
import _ from 'underscore';
import { message } from 'antd';
import omdbApi from './../../../api/omdbApi';
export const imdbMoviesList = (data, valName) => {
  return {
    type: IMDB_MOVIES_LIST,
    data,
    valName,
  };
};
let count = 1;
export const fetchMoviesList = (movieId, indx) => async (
  dispatch,
  getState
) => {
  let omdbData = { ...getState().omdbReducer };
  return omdbApi
    .listMovies(movieId)
    .then(async (res) => {
      if (res.status === 200) {
        let data = await res.data;
        omdbData[`moviesList_${indx + count}`] = data;
        await dispatch(imdbMoviesList(omdbData, `moviesList_${indx + count}`));
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
export const searchMovies = (searchVal) => async (dispatch, getState) => {
  let omdbData = { ...getState().omdbReducer };
  return omdbApi
    .searchMovies(searchVal)
    .then(async (res) => {
      if (res.status === 200) {
        let data = await res.data;
        omdbData[`movieList`] = data;
        delete omdbData['moviesList_1'];
        await dispatch(imdbMoviesList(omdbData, `movieList`));
        await dispatch(imdbMoviesList(omdbData, `moviesList_1`));
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
