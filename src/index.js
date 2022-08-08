import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import { GraphQLError } from 'graphql';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Todos from './todos/Todos';
import Signup from './auth/Signup';
import Login from './auth/Login';
import { REFRESH_ACCESS_TOKEN } from './auth/mutations/refreshAccessToken.ts'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const unguardedEndpoints = [
  'RefreshAccessToken',
  'Login',
  'Signup'
]

const authLink = setContext((request, { headers }) => {
  if (request.operationName in unguardedEndpoints) {
    console.log(request.operationName)
    return { headers }
  }

  const token = localStorage.getItem('accessToken') || ''

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            console.dir(operation)
            // ignore 401 error for a refresh request
            if (operation.operationName === 'refreshToken') return;

            const observable = new Observable(
              (observer) => {

                (async () => {
                  try {
                    const accessToken = await refreshToken();

                    if (!accessToken) {
                      throw new GraphQLError('Empty AccessToken');
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);

                    <Navigate to="/" replace={true} />
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );

            return observable;

          default:
            break;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});

// Request a refresh token to then stores and returns the accessToken.
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    const response = await client.mutate({
      mutation: REFRESH_ACCESS_TOKEN,
      variables: { refreshToken }
    });

    const accessToken = response.data?.refreshAccessToken.accessToken;
    localStorage.setItem('accessToken', accessToken || '');

    return accessToken;
  } catch (err) {
    localStorage.clear();
    throw err;
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Todos />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
