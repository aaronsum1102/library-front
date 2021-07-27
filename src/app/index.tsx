import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider, AppContextProvider } from './contexts';
import App from './App';

render(
  <BrowserRouter>
    <AuthContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
