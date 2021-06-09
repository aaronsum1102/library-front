import React from 'react';
import { render } from 'react-dom';

import { AuthContextProvider } from './contexts';

import { App } from './App';

render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);

if (typeof module.hot !== 'undefined') {
  module.hot.accept(); /* eslint-disable-line no-undef */
}
