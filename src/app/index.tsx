import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import '~src/translations';
import { AuthContextProvider, AppContextProvider } from './contexts';
import App from './App';
import apolloClient from './apollo/apollo-client';

render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
