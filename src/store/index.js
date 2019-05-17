import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './root-reducer';

const persistConfig = {
  key: 'test-app',
  storage,
  blacklist: 'posts'
};

export default function setupStore(history) {
  const middlewares = applyMiddleware(routerMiddleware(history), thunk);
  const enhancer = composeWithDevTools({})(middlewares);
  const persistedReducer = persistReducer(persistConfig, rootReducer(history));
  const preloadedState = {};

  const store = createStore(persistedReducer, preloadedState, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}