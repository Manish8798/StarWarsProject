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

const FilmScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/films/')
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
        height: 1,
        width: 10,
        backgroundColor: 'transparent',
      }}
    />
  );

  const formatCreatedDate = originalDate => {
    const formattedDate = new Date(originalDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const formattedDateString = formattedDate.toLocaleDateString(
      'en-US',
      options,
    );
    return formattedDateString;
  };

  const renderItem = useCallback(
    ({item, index}) => (
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
              {item?.release_date}
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
              source={{uri: `https://picsum.photos/id/${index + 40}/400/600`}}
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
            {formatCreatedDate(item?.created)}
          </Text>
          <Heading alignSelf="flex-start" size="md">
            {item?.title}
          </Heading>
          <Text
            textAlign="justify"
            alignSelf="flex-start"
            size="sm"
            numberOfLines={2}>
            {item?.opening_crawl}
          </Text>
          <Text alignSelf="flex-start" size="xs">
            {item?.director}
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
        data={data}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        keyExtractor={item => item?.title} // Adjust this based on your data structure
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
    padding: 2,
  },
});

export default FilmScreen;
