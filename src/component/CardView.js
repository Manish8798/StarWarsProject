import React from 'react';
import {VStack, Text, Heading, Image, Pressable} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const CardView = ({index, item, toggleModal}) => {
  const [homeworldName, setHomeworldName] = React.useState('$homeworld');
  React.useEffect(() => {
    getHomeworld(item?.homeworld);
  }, []);

  const getHomeworld = async homeworld => {
    await fetch(homeworld)
      .then(response => response.json())
      .then(result => {
        setHomeworldName(result?.name);
        // console.log('homeworld', result?.name);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleOnPress = (item, index, homeworldName) => {
    toggleModal(item, index, homeworldName);
  };

  return (
    <Pressable onPress={() => handleOnPress(item, index, homeworldName)}>
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
          {item?.name}
        </Heading>
        <Text size="sm">
          The characters Hails from {homeworldName}, born on {item?.birth_year}
        </Text>
      </VStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: responsiveScreenHeight(2),
    width: responsiveScreenWidth(35),
  },
});

export default CardView;
