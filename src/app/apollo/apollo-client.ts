import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Operation,
  NextLink,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import firebase from 'firebase/app';

import getRuntimeConfig from '~config/index';
import { firebaseApp } from '~app/contexts';

const { app } = getRuntimeConfig();

let authToken: string | null;

const acquireAuthToken = async (): Promise<string | null> => {
  const user = firebase.auth(firebaseApp).currentUser;

  if (user) {
    const idToken = await user.getIdToken(true);

    return idToken;
  }

  return null;
};

const resetToken = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    if (graphQLErrors[0].extensions?.code === 'UNAUTHENTICATED') {
      authToken = null;
    }
  }
});

const withAuthToken = setContext(() => {
  if (authToken) return { authToken };

  return acquireAuthToken().then((token) => ({ token }));
});

const authTokenLink = withAuthToken.concat(resetToken);

const authMiddleware = new ApolloLink((operation: Operation, forward: NextLink) => {
  const { token } = operation.getContext();

  operation.setContext(({ headers = {} }) => {
    if (!token) return headers;

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    };
  });

  return forward(operation);
});

const httpLink = createHttpLink({
  uri: app.apiUrl
});

const client = new ApolloClient({
  link: ApolloLink.from([authTokenLink, authMiddleware, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          resourcesByUser: {
            merge(existing = [], incoming: unknown[]) {
              if (existing.length !== incoming.length) {
                return [...incoming];
              }

              return [...existing, ...incoming];
            }
          },
          resources: {
            merge(existing = [], incoming: unknown[]) {
              if (existing.length !== incoming.length) {
                return [...incoming];
              }

              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  })
});

export default client;
