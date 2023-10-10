import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PeopleScreen from '../screens/PeopleScreen';
import {BackHandler} from 'react-native';
import PlanetScreen from '../screens/PlanetScreen';
import FilmScreen from '../screens/FilmScreen';
import StarshipScreen from '../screens/StarshipScreen';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackButton = () => {
    // Handle the back button press logic here
    // You can add a confirmation dialog or take any other action
    // To exit the app, you can use the `BackHandler.exitApp()` method
    BackHandler.exitApp();
    return true; // Prevent default behavior (exit the app immediately)
  };
  return (
    <Tab.Navigator>
      <Tab.Screen name="Peoples" component={PeopleScreen} />
      <Tab.Screen name="Planets" component={PlanetScreen} />
      <Tab.Screen name="Films" component={FilmScreen} />
      <Tab.Screen name="Starships" component={StarshipScreen} />
    </Tab.Navigator>
  );
}
