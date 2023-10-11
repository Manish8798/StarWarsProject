import React, {useState} from 'react';
import {
  VStack,
  Text,
  Image,
  HStack,
  Heading,
  Pressable,
} from '@gluestack-ui/themed';
import {StyleSheet, FlatList, View} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {MoreHorizontal} from 'lucide-react-native';

const PlanetScreen = () => {
  const [data, setData] = useState([
    {key: '1', name: 'Item 1'},
    {key: '2', name: 'Item 2'},
    {key: '3', name: 'Item 3'},
    {key: '4', name: 'Item 4'},
    {key: '5', name: 'Item 5'},
    {key: '6', name: 'Item 6'},
    // Add more items as needed
  ]);

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: 10,
        backgroundColor: 'transparent',
      }}
    />
  );

  const renderItem = ({item}) => (
    <Pressable onPress={() => console.log('press')}>
      <VStack style={styles.item}>
        <Pressable
          zIndex={1}
          position="absolute"
          alignSelf="flex-end"
          padding={20}
          onPress={() => console.log('menu')}>
          <MoreHorizontal
            style={{
              backgroundColor: '#fff',
            }}
            color="#000"
            size={20}
          />
        </Pressable>
        <VStack
          style={{
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            // Add elevation for Android (Android-specific)
            elevation: 2,
          }}>
          <Image
            width={responsiveScreenWidth(100)}
            resizeMode="cover"
            size="xl"
            borderRadius={'$xl'}
            source={require('../../assets/vader.jpg')}
            alt="item"
          />
        </VStack>
        <Heading
          alignSelf="flex-start"
          size="sm"
          paddingVertical={2}
          paddingHorizontal={4}>
          Title
        </Heading>
        <Text textAlign="justify" size="sm">
          To use the component in your project, run the command below into your
          import statement. This will import the component from your components
          folder.
        </Text>
      </VStack>
    </Pressable>
  );

  return (
    <VStack style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
});

export default PlanetScreen;
