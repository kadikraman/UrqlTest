import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'urql';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ArtDetailScreen from './screens/ArtDetailScreen';
import SplashScreen from 'react-native-splash-screen';
import { client } from './graphql/client';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider value={client}>
      <StatusBar barStyle="dark-content" />
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
