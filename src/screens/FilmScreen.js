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

const FilmScreen = () => {
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
        <HStack
          zIndex={1}
          width={'100%'}
          paddingHorizontal={10}
          paddingTop={10}
          position="absolute"
          alignItems="center"
          justifyContent="space-between">
          <Text
            borderRadius={'$sm'}
            paddingHorizontal={5}
            backgroundColor="rgba(128, 128, 128, 0.5)"
            size="xs"
            color="#fff">
            Release Date
          </Text>
          <Pressable onPress={() => console.log('menu')}>
            <MoreHorizontal
              style={{backgroundColor: '#fff', zIndex: 100}}
              color="#000"
              size={20}
            />
          </Pressable>
        </HStack>
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
            borderRadius={'$lg'}
            source={require('../../assets/vader.jpg')}
            alt="item"
          />
        </VStack>
        <Text
          backgroundColor="#fff"
          borderColor="gray"
          borderWidth={1}
          borderRadius={4}
          paddingHorizontal={4}
          size="xs"
          marginVertical={5}
          alignSelf="flex-start">
          Created
        </Text>
        <Heading alignSelf="flex-start" size="sm">
          Title
        </Heading>
        <Text alignSelf="flex-start" size="sm">
          Opening crawl
        </Text>
        <Text alignSelf="flex-start" size="xs">
          director
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

export default FilmScreen;
