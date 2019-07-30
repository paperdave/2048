import { createStore } from 'redux';
import { IGame } from './reducers/game';
import rootReducer from './reducers';

const reduxDevTools = ((window as any).__REDUX_DEVTOOLS_EXTENSION__) as (Function | undefined);

const store = createStore(
  rootReducer,
  reduxDevTools ? reduxDevTools() : undefined,
);

export default store;

export interface IStore {
  game: IGame,
}
