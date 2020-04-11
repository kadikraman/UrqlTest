import React from 'react';
import { createClient, Provider } from 'urql';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ArtDetailScreen from './screens/ArtDetailScreen';

const Stack = createStackNavigator();

const client = createClient({
  url: 'https://metaphysics-production.artsy.net/',
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
