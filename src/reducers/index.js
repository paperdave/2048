import { combineReducers } from 'redux';

export default combineReducers({
  game: require('./game').default,
});
