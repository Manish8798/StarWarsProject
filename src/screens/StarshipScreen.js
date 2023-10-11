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
import {DotIcon} from 'lucide-react-native';

const StarshipScreen = () => {
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
    <Pressable
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        // Add elevation for Android (Android-specific)
        elevation: 2,
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 20,
      }}
      borderRadius={'$2xl'}
      onPress={() => console.log('press')}>
      <VStack style={styles.item}>
        <Image
          width={responsiveScreenWidth(100)}
          resizeMode="cover"
          size="xl"
          source={require('../../assets/vader.jpg')}
          alt="item"
          borderTopLeftRadius={'$2xl'}
          borderTopRightRadius={'$2xl'}
        />
        <VStack width={'100%'} padding={10} paddingBottom={20}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack alignSelf="flex-start">
              <Heading size="sm" paddingVertical={2}>
                Title
              </Heading>
              <HStack justifyContent="flex-start" alignItems="center">
                <Text size="xs">Modal</Text>
                <DotIcon size={20} color="gray" />
                <Text size="xs">Starship class</Text>
              </HStack>
            </VStack>
            <Image
              size="xs"
              alt="rocket"
              source={require('../../assets/rocket.png')}
            />
          </HStack>
          <Text paddingVertical={10} size="xs" textAlign="justify">
            The structure provided below can help you identify and understand a
            Image component's various parts.
          </Text>
          <HStack
            justifyContent="flex-end"
            alignItems="center"
            paddingBottom={10}>
            <Text size="xs">Manufacturer</Text>
            <DotIcon size={20} color="gray" />
            <Text size="xs">Starship class</Text>
          </HStack>
        </VStack>
      </VStack>
    </Pressable>
  );

  return (
    <VStack style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  item: {
    alignItems: 'center',
  },
});

export default StarshipScreen;
