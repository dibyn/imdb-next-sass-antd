import { IMDB_MOVIES_LIST } from './../types';
import Immutable from 'immutable';
const initialState = Immutable.fromJS({
  loader: false,
});
export const omdbReducer = (state = { initialState }, action) => {
  switch (action.type) {
    case IMDB_MOVIES_LIST:
      return {
        ...state,
        [action.valName]: action.data[action.valName],

      };
    default:
      return state;
  }
};
export default omdbReducer;
