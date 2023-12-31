import React, {useState, useEffect, useCallback} from 'react';
import {
  VStack,
  Text,
  Image,
  HStack,
  Heading,
  Pressable,
  Spinner,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
  ButtonText,
  ButtonGroup,
  ButtonSpinner,
  Center,
} from '@gluestack-ui/themed';
import {StyleSheet, FlatList, View} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {AlertCircle, MoreHorizontal} from 'lucide-react-native';
import MenuPopup from '../component/MenuPopup';

const PlanetScreen = () => {
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPlanets();
  }, []);

  const getPlanets = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/planets/')
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

  const handleMenu = index => {
    // console.log(index, 'menu', showMenu);
    if (currentIndex == index) {
      setShowMenu(state => !state);
      return;
    }
    setCurrentIndex(index);
    setShowMenu(true);
  };

  const handleDelete = data => {
    // console.log(data);
    setShowAlertDialog(true);
    setShowMenu(false);
    setSelectedName(data);
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
      <Pressable onPress={() => setShowMenu(false)}>
        <VStack style={styles.item}>
          <Pressable
            zIndex={1}
            position="absolute"
            alignSelf="flex-end"
            padding={10}
            onPress={() => handleMenu(index)}>
            <VStack borderRadius={'$md'} backgroundColor="#fff" padding={2}>
              <MoreHorizontal
                style={{backgroundColor: '#fff'}}
                color="#000"
                size={20}
              />
            </VStack>
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
            paddingVertical={10}
            paddingHorizontal={4}>
            {item?.name}
          </Heading>
          <Text paddingBottom={10} textAlign="justify" size="sm">
            The planet is inhabited by {item?.population} creatures. The terrain
            is {item?.terrain}. With orbital period of {item?.orbital_period} of
            around its local star.
          </Text>
        </VStack>
        {showMenu && currentIndex == index && (
          <MenuPopup handleDelete={handleDelete} data={item?.name} />
        )}
      </Pressable>
    ),
    [data, currentIndex, showMenu],
  );

  const boldText = text => <Text bold>{text}</Text>;

  if (isFailed) {
    return (
      <Center alignSelf="center" flex={1}>
        <Button
          onPress={() => getPlanets()}
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
        contentContainerStyle={{
          paddingVertical: 20,
          width: responsiveScreenWidth(90),
        }}
        keyExtractor={item => item?.name}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
      />
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <Heading size="lg">Caution!</Heading> */}
            <AlertDialogCloseButton>
              <AlertCircle size={24} color="#FF7070" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Heading size="lg">Caution!</Heading>
            <Text size="sm">
              Are you sure want to Delete {boldText(selectedName)}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="xl">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  setShowAlertDialog(false);
                }}>
                <ButtonText>Yes</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
