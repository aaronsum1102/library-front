import { ApolloClient, InMemoryCache } from '@apollo/client';

import getRuntimeConfig from '~config/index';

const { app } = getRuntimeConfig();

const client = new ApolloClient({
  uri: app.apiUrl,
  cache: new InMemoryCache()
});

export default client;
