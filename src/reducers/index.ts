import { combineReducers } from 'redux';
import { ActionObject, Type } from '../actions';
import { IStore } from '../store';

const rootReducer = combineReducers({
  game: require('./game').default,
});

export default function (state: IStore, action: ActionObject) {
  if (state === undefined) {
    if (localStorage['2048_save_file']) {
      return rootReducer(JSON.parse(localStorage['2048_save_file']), action);
    }
  }
  const newState = rootReducer(state, action);
  localStorage['2048_save_file'] = JSON.stringify(rootReducer(state, { type: Type.GET_SAVE_FILE }));
  return newState;
}
