import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SInfo from 'react-native-sensitive-info';
import {
  createClient,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { pipe, mergeMap, fromPromise, map } from 'wonka';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ArtDetailScreen from './screens/ArtDetailScreen';

const Stack = createStackNavigator();

const authExchange = ({ forward }) => {
  return ops$ => {
    return pipe(
      ops$,
      map(async operation => {
        // 1 Async Storage - warnings
        // const token = await AsyncStorage.getItem('test');

        // 2 Sensitive Storage - warnings
        // const token = await SInfo.getItem('test', {});

        // 3. Promise.resolve - does not error
        // const token = await new Promise(res => setTimeout(res, 500));

        return {
          ...operation,
          context: {
            ...operation.context,
            fetchOptions: {
              ...operation.context.fetchOptions,
              headers: { Authorization: '' },
            },
          },
        };
      }),
      mergeMap(fromPromise),
      forward,
    );
  };
};

const client = createClient({
  url: 'https://metaphysics-production.artsy.net/',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    authExchange,
    fetchExchange,
  ],
});

const App = () => {
  return (
    <Provider value={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ArtDetail" component={ArtDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
