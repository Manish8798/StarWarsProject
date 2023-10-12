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
} from '@gluestack-ui/themed';
import {StyleSheet, FlatList, View} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  Download,
  Eye,
  FolderEdit,
  FolderMinus,
  MoreHorizontal,
  Trash2,
} from 'lucide-react-native';
import {Share} from 'lucide-react-native';
import {Lock} from 'lucide-react-native';
import MenuPopup from '../component/MenuPopup';

const FilmScreen = () => {
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedName, setSelectedName] = useState(null);

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
        height: 20,
        width: '100%',
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

  const handleMenu = index => {
    console.log(index, 'menu', showMenu);
    if (currentIndex == index) {
      setShowMenu(state => !state);
      return;
    }
    setCurrentIndex(index);
    setShowMenu(true);
  };

  const handleDelete = data => {
    console.log(data);
    setShowAlertDialog(true);
    setShowMenu(false);
    setSelectedName(data);
  };

  const renderItem = useCallback(
    ({item, index}) => (
      <Pressable onPress={() => setShowMenu(false)}>
        <VStack style={styles.item}>
          <HStack
            zIndex={1}
            width={'100%'}
            paddingHorizontal={10}
            paddingVertical={10}
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
            <Pressable onPress={() => handleMenu(index)}>
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
        {showMenu && currentIndex == index && (
          <MenuPopup handleDelete={handleDelete} data={item?.title} />
        )}
      </Pressable>
    ),
    [data, currentIndex, showMenu],
  );

  const boldText = text => <Text bold>{text}</Text>;

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
        keyExtractor={item => item?.title}
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
            <Heading size="lg">Caution!</Heading>
            <AlertDialogCloseButton>
              <Lock size={20} color="#000" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
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
    padding: 2,
  },
});

export default FilmScreen;
