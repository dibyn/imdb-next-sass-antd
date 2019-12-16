import { IMDB_MOVIES_LIST } from './../../types';
import _ from 'underscore';
import { message } from 'antd';
import omdbApi from './../../../api/omdbApi';
const apiUrl = process.env.API_URL;
const listMovieApiUrl = `${apiUrl}/?s=requiem`
export const imdbMoviesList = (data) => {
  return {
    type: IMDB_MOVIES_LIST,
    payload: data,
  };
};
export const fetchMoviesList = (payload) => async (dispatch, getState) => {
  dispatch(loader(true));
    let omdbData = { ...getState().omdbReducer };
    console.log(listMovieApiUrl, 'listMovieApiUrl');
  return omdbApi
    .listMovies(listMovieApiUrl)
    .then(async (res) => {
      console.log(res, 'res');
      if (res.status === 200) {
        let data = await res.data;
        omdbData.moviesList = data;
        await dispatch(imdbMoviesList(usersData));
        dispatch(loader(false));
        return res.data;
      } else {
        res.data && res.data.error
          ? message.info(res.data.error.message)
          : message.info('Something went wrong, please try again later');
        omdbData.moviesList = res.data.error.message;
        await dispatch(imdbMoviesList(usersData));
        dispatch(loader(false));
        return;
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        message.error(error.response.data.error.message);
        dispatch(loader(false));
      } else {
        message.error('Request to fetch data failed');
      }
    });
};

export const loader = (bool) => (dispatch, getState) => {
  let omdbData = { ...getState().omdbReducer };
  omdbData.loader = bool;
  dispatch(assignPlans(plansData));
};
