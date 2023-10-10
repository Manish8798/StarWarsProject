import React from 'react';
import {Text, VStack, Image} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';
import {Colors} from '../utils/Theme';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const LaunchScreen = () => {
  return (
    <VStack style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../../assets/starwars.png')}
        size="2xl"
        alt="star wars"
        padding={5}
      />
      <Image
        resizeMode="cover"
        source={require('../../assets/vader.jpg')}
        size="2xl"
        alt="star wars"
        borderRadius={'$xs'}
        style={styles.headImg}
      />
      <VStack style={{width: responsiveScreenWidth(85)}}>
        <Text
          //   fontFamily="RussoOneRegular"
          style={styles.headText}
          padding={10}
          size="2xl"
          bold>
          Welcome to Star Wars Dashboard
        </Text>
        <Text>
          Star Wars is an American epic space opera multimedia franchise created
          by George Lucas, which began with the eponymous 1977 film and quickly
          became a world wide pop culture phenomenon.
        </Text>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR,
    paddingTop: responsiveScreenHeight(5),
  },
  headText: {
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'RussoOneRegular',
  },
  headImg: {
    width: responsiveScreenWidth(85),
  },
});

export default LaunchScreen;
