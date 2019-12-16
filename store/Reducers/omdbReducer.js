import { IMDB_MOVIES_LIST } from './../types';
export const omdbReducer = (
  state = {
    loader: false,
  },
  action
) => {
  switch (action.type) {
    case IMDB_MOVIES_LIST: {
      return action.payload ? action.payload : state;
    }
    default:
      return state;
  }
};
export default omdbReducer;
