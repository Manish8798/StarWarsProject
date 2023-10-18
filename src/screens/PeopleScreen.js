import React, {useState, useEffect, useCallback} from 'react';
import {
  VStack,
  Text,
  Heading,
  Spinner,
  Pressable,
  Button,
  ButtonText,
  Image,
  Center,
  ButtonSpinner,
} from '@gluestack-ui/themed';
import {StyleSheet, FlatList, View, ScrollView, Modal} from 'react-native';
import CardView from '../component/CardView';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {XCircle} from 'lucide-react-native';

const PeopleScreen = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [popupData, setPopupData] = useState({
    name: '',
    homeworld: '',
    birth_year: '',
  });
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople();
  }, []);

  const getPeople = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/people/')
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

  const getHomeworld = async (name, homeworld, birth_year) => {
    // console.log(typeof homeworld);
    await fetch(homeworld)
      .then(response => response.json())
      .then(result => {
        let homeworld = result?.name;
        setPopupData({...popupData, name, homeworld, birth_year});
        setModalVisible(state => !state);
      })
      .catch(error => {
        setModalVisible(state => !state);
        setPopupData({...popupData, name, birth_year});
        console.error('Error fetching data:', error);
      });
  };

  const toggleModal = async (item, index, homeworld) => {
    setCurrentIndex(index);
    const {name, birth_year} = item;
    setPopupData({...popupData, name, homeworld, birth_year});
    setModalVisible(state => !state);
    // await getHomeworld(name, homeworld, birth_year);
    // console.log('toggle', isModalVisible, popupData);
  };

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: 10,
        backgroundColor: 'transparent',
      }}
    />
  );

  const renderItem = useCallback(
    ({item, index}) => {
      return <CardView index={index} item={item} toggleModal={toggleModal} />;
    },
    [data],
  );

  if (isFailed) {
    return (
      <Center alignSelf="center" flex={1}>
        <Button
          onPress={() => getPeople()}
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
    <ScrollView style={styles.container}>
      <VStack>
        <Heading size="lg">Popular Characters</Heading>
        <FlatList
          style={styles.hList}
          keyExtractor={item => item?.name}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderItem}
        />
      </VStack>
      <VStack>
        <Heading size="lg">All Characters</Heading>
        <FlatList
          style={styles.hList}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          keyExtractor={item => item?.name}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderItem}
        />
      </VStack>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <VStack style={styles.modalContainer}>
          <VStack
            borderTopLeftRadius={'$2xl'}
            borderTopRightRadius={'$2xl'}
            style={styles.modalContent}>
            <Pressable
              onPress={() => setModalVisible(state => !state)}
              style={{position: 'absolute', top: 10, end: 10, zIndex: 1}}>
              <XCircle size={32} color="#000" />
            </Pressable>
            <Image
              size="2xl"
              borderTopLeftRadius={'$2xl'}
              borderTopRightRadius={'$2xl'}
              alt="popup"
              width={responsiveScreenWidth(100)}
              source={{
                uri: `https://picsum.photos/id/${currentIndex + 10}/400/600`,
              }}
            />
            <VStack padding={20}>
              <Heading>{popupData.name}</Heading>
              <Text color="blue" paddingVertical={10}>
                {popupData.homeworld}
              </Text>
              <Text size="xl" color="#000">
                The character Hails from {popupData.homeworld}, born on{' '}
                {popupData.birth_year}
              </Text>
            </VStack>
            <Button
              bottom={20}
              start={20}
              end={20}
              position="absolute"
              onPress={() => setModalVisible(false)}
              size="md"
              variant="solid"
              action="primary">
              <ButtonText>Got It</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },
  hList: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(60),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
  },
});

export default PeopleScreen;
