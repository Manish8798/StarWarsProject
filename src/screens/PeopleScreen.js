import React, {useState} from 'react';
import {VStack, Text, Heading} from '@gluestack-ui/themed';
import {StyleSheet, FlatList, View, ScrollView} from 'react-native';
import CardView from '../component/CardView';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

const PeopleScreen = () => {
  const [data, setData] = useState([
    {key: '1', name: 'Item 1'},
    {key: '2', name: 'Item 2'},
    {key: '3', name: 'Item 3'},
    {key: '4', name: 'Item 4'},
    {key: '5', name: 'Item 5'},
    {key: '6', name: 'Item 6'},
    // Add more items as needed
  ]);

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: 10,
        backgroundColor: 'transparent',
      }}
    />
  );
  return (
    <ScrollView style={styles.container}>
      <VStack>
        <Heading size="lg">Popular Characters</Heading>
        <FlatList
          style={styles.hList}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          ItemSeparatorComponent={renderSeparator}
          renderItem={({item}) => <CardView />}
        />
      </VStack>
      <VStack>
        <Heading size="lg">All Characters</Heading>
        <FlatList
          style={styles.hList}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          ItemSeparatorComponent={renderSeparator}
          renderItem={({item}) => <CardView />}
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
