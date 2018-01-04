import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import store from './store';
import './assets/css/main.scss';

// eslint-disable-next-line no-use-before-define
renderWithHotReload(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const RootContainer = require('./App').default;
    // eslint-disable-next-line no-use-before-define
    renderWithHotReload(RootContainer);
  });
}

function renderWithHotReload(RootContainer) {
  render(
    <AppContainer>
      <Provider store={store}>
        <RootContainer />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
}
