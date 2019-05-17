import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history';

import Main from './pages/Main';

import { Api } from './helpers/ApiClient';

import setupStore from './store';

import './App.css';

const history = createBrowserHistory();
const { store, persistor } = setupStore(history);

Api.init(store);


class App extends Component {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <div>Something went wrong</div>;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Main />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
