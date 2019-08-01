import { createStore, Reducer } from 'redux';
import { IGame } from './reducers/game';
import rootReducer from './reducers';
import { ActionObject } from './actions';

const reduxDevTools = ((window as any).__REDUX_DEVTOOLS_EXTENSION__) as (Function | undefined);

const store = createStore(
  rootReducer as Reducer<IStore, ActionObject>,
  reduxDevTools ? reduxDevTools() : undefined,
);

export default store;

export interface IStore {
  game: IGame,
}
