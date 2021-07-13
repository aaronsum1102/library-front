import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './contexts';

import { App } from './components';

render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
