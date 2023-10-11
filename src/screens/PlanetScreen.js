import React, {useState, useEffect, useCallback} from 'react';
import {
  VStack,
  Text,
  Image,
  HStack,
  Heading,
  Pressable,
  Spinner,
} from '@gluestack-ui/themed';
import {StyleSheet, FlatList, View} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {MoreHorizontal} from 'lucide-react-native';

const PlanetScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets/')
      .then(response => response.json())
      .then(result => {
        console.log(result.results.length);
        setData(result?.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderSeparator = () => (
    <View
      style={{
        height: 20,
        width: '100%',
        backgroundColor: 'transparent',
      }}
    />
  );

  const renderItem = useCallback(
    ({item, index}) => (
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
              source={{uri: `https://picsum.photos/id/${index + 10}/400/600`}}
              alt="item"
            />
          </VStack>
          <Heading
            alignSelf="flex-start"
            size="md"
            paddingVertical={2}
            paddingHorizontal={4}>
            {item?.name}
          </Heading>
          <Text textAlign="justify" size="sm">
            The planet is inhabited by {item?.population} creatures. The terrain
            is {item?.terrain}. With orbital period of {item?.orbital_period} of
            around its local star.
          </Text>
        </VStack>
      </Pressable>
    ),
    [data],
  );

  return data.length == 0 ? (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Spinner size={'large'} />
    </VStack>
  ) : (
    <VStack style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{
          paddingVertical: 20,
          width: responsiveScreenWidth(90),
        }}
        keyExtractor={item => item?.name}
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
    // marginVertical: 10,
    // marginHorizontal: 20,
    alignItems: 'center',
  },
});

export default PlanetScreen;
