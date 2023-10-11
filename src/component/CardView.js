import React from 'react';
import {VStack, Text, Heading, Image} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const CardView = ({name, homeworld, birthYear, index}) => {
  const [homeworldName, setHomeworldName] = React.useState('$homeworld');
  React.useEffect(() => {
    getHomeworld(homeworld);
  }, []);

  const getHomeworld = async homeworld => {
    await fetch(homeworld)
      .then(response => response.json())
      .then(result => {
        setHomeworldName(result?.name);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  return (
    <VStack style={styles.container}>
      <Image
        size="xl"
        borderRadius={'$lg'}
        source={{
          uri: `https://picsum.photos/id/${index + 10}/200/300`,
        }}
        alt="image"
      />
      <Heading
        numberOfLines={1}
        ellipsizeMode="tail"
        paddingVertical={5}
        size="md">
        {name}
      </Heading>
      <Text size="sm">
        The characters Hails from {homeworldName}, born on {birthYear}
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
