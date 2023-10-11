import React from 'react';
import {VStack, Text, Heading, Image} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const CardView = () => {
  return (
    <VStack style={styles.container}>
      <Image
        size="xl"
        borderRadius={'$lg'}
        source={{
          uri: 'https://picsum.photos/seed/picsum/200/300',
        }}
        alt="image"
      />
      <Heading paddingVertical={5} size="md">
        Name
      </Heading>
      <Text size="sm">
        This is a sample Text Jokes apart I love her, truly love her
      </Text>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: responsiveScreenHeight(2),
    width: responsiveScreenWidth(35),
  },
});

export default CardView;
