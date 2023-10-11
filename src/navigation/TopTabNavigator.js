import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PeopleScreen from '../screens/PeopleScreen';
import {BackHandler, StyleSheet} from 'react-native';
import PlanetScreen from '../screens/PlanetScreen';
import FilmScreen from '../screens/FilmScreen';
import StarshipScreen from '../screens/StarshipScreen';
import {
  VStack,
  Text,
  HStack,
  Image,
  Input,
  InputField,
  InputSlot,
  InputIcon,
} from '@gluestack-ui/themed';
import {Colors} from '../utils/Theme';
import {Search} from 'lucide-react-native';

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

  function formatTitle(title) {
    // Convert the title to lowercase and capitalize the first letter
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  }

  const searchBar = () => {
    return (
      <VStack style={styles.searchView}>
        <HStack alignContent="center" justifyContent="space-between">
          <Image
            resizeMode="contain"
            source={require('../../assets/starwars.png')}
            size="sm"
            alt="star wars"
          />
          <Image
            resizeMode="contain"
            source={require('../../assets/notification.png')}
            size="2xs"
            alt="star wars"
            marginTop={16}
          />
        </HStack>
        <Input variant="outline" size="md" backgroundColor="#fff">
          <InputField placeholder="Search characters" />
          <InputSlot>
            <InputIcon paddingRight={25} paddingVertical={10}>
              <Search color="gray" size={20} />
            </InputIcon>
          </InputSlot>
        </Input>
      </VStack>
    );
  };

  return (
    <VStack style={{flex: 1}}>
      {searchBar()}
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: Colors.BACKGROUND_COLOR,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: ({focused}) => (
              <Text size="md" style={{color: focused ? '#fff' : 'gray'}}>
                {formatTitle('Peoples')}
              </Text>
            ),
          }}
          name="Peoples"
          component={PeopleScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({focused}) => (
              <Text size="md" style={{color: focused ? '#fff' : 'gray'}}>
                {formatTitle('Planets')}
              </Text>
            ),
          }}
          name="Planets"
          component={PlanetScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({focused}) => (
              <Text size="md" style={{color: focused ? '#fff' : 'gray'}}>
                {formatTitle('Films')}
              </Text>
            ),
          }}
          name="Films"
          component={FilmScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({focused}) => (
              <Text size="md" style={{color: focused ? '#fff' : 'gray'}}>
                {formatTitle('Starships')}
              </Text>
            ),
          }}
          name="Starships"
          component={StarshipScreen}
        />
      </Tab.Navigator>
    </VStack>
  );
}

const styles = StyleSheet.create({
  searchView: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
