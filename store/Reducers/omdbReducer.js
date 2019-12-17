import { IMDB_MOVIES_LIST } from './../types';
import Immutable from 'immutable';
const initialState = Immutable.fromJS({
  loader: false,
});
export const omdbReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMDB_MOVIES_LIST:
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};
export default omdbReducer;
