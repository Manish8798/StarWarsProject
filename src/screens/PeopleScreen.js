import React, {useState, useEffect, useCallback} from 'react';
import {VStack, Text, Heading, Spinner} from '@gluestack-ui/themed';
import {StyleSheet, FlatList, View, ScrollView} from 'react-native';
import CardView from '../component/CardView';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

const PeopleScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/')
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

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <CardView
          index={index}
          name={item?.name}
          homeworld={item?.homeworld}
          birthYear={item?.birth_year}
        />
      );
    },
    [data],
  );

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
          keyExtractor={item => item?.name} // Adjust this based on your data structure
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
          keyExtractor={item => item?.name} // Adjust this based on your data structure
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderItem}
        />
      </VStack>
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
});

export default PeopleScreen;
