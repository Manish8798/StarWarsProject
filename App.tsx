// import 'react-native-gesture-handler';
import React from 'react';
import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import LaunchScreen from './src/screens/LaunchScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/PeopleScreen';
import MyTabs from './src/navigation/TopTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
          <Stack.Screen name="Home" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
