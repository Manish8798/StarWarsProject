import React, {useState, useEffect, useCallback} from 'react';
import {
  VStack,
  Text,
  Image,
  HStack,
  Heading,
  Pressable,
  Spinner,
  Center,
  Button,
  ButtonText,
  ButtonSpinner,
} from '@gluestack-ui/themed';
import {StyleSheet, FlatList, View} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {DotIcon} from 'lucide-react-native';

const StarshipScreen = () => {
  const [data, setData] = useState([]);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStarships();
  }, []);

  const getStarships = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/starships/')
      .then(response => response.json())
      .then(result => {
        // console.log(result.results.length);
        setIsLoading(false);
        setIsFailed(false);
        setData(result?.results);
      })
      .catch(error => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        setIsFailed(true);
        console.error('Error fetching data:', error);
      });
  };

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
      <Pressable
        style={{
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          // Add elevation for Android (Android-specific)
          elevation: 2,
          backgroundColor: '#fff',
        }}
        borderRadius={'$2xl'}
        onPress={() => console.log('press')}>
        <VStack style={styles.item}>
          <Image
            width={responsiveScreenWidth(100)}
            resizeMode="cover"
            size="xl"
            source={{uri: `https://picsum.photos/id/${index + 10}/400/600`}}
            alt="item"
            borderTopLeftRadius={'$2xl'}
            borderTopRightRadius={'$2xl'}
          />
          <VStack padding={10} paddingBottom={20}>
            <HStack justifyContent="space-between" alignItems="center">
              <VStack alignSelf="flex-start">
                <Heading size="md" paddingVertical={2}>
                  {item?.name}
                </Heading>
                <HStack justifyContent="flex-start" alignItems="center">
                  <Text size="xs">{item?.model}</Text>
                  <DotIcon size={20} color="gray" />
                  <Text size="xs">{item?.starship_class}</Text>
                </HStack>
              </VStack>
              <Image
                size="xs"
                alt="rocket"
                source={require('../../assets/rocket.png')}
              />
            </HStack>
            <Text paddingVertical={10} size="sm" textAlign="justify">
              The starship starred in {item?.films[0]} and was piloted by{' '}
              {item?.pilots?.length}
            </Text>
            <HStack
              justifyContent="flex-end"
              alignItems="center"
              paddingBottom={10}>
              <Text size="xs">{item?.manufacturer}</Text>
              <DotIcon size={20} color="gray" />
              <Text size="xs">{item?.hyperdrive_rating}</Text>
            </HStack>
          </VStack>
        </VStack>
      </Pressable>
    ),
    [data],
  );

  if (isFailed) {
    return (
      <Center alignSelf="center" flex={1}>
        <Button
          onPress={() => getStarships()}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText>Retry </ButtonText>
          {isLoading && <ButtonSpinner />}
        </Button>
      </Center>
    );
  }

  return data.length == 0 ? (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Spinner size={'large'} />
    </VStack>
  ) : (
    <VStack style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item?.name}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingVertical: 20,
          width: responsiveScreenWidth(90),
        }}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  item: {},
});

export default StarshipScreen;
