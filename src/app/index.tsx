import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { AuthContextProvider, AppContextProvider } from './contexts';
import App from './App';
import apolloClient from '~app/apollo/apollo-client';

render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
