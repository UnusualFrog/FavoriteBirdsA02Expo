import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import {useState, useReducer} from 'react';

import Bird from './components/bird.js'

import Bluejay from './birdData/Bluejay.json';
import Flicker from './birdData/Flicker.json';
import Nuthatch from './birdData/Nuthatch.json';

export default function App() {

  const [birdData, setBirdData] = useState(Bluejay);

  const [birdIndex, setBirdIndex] = useReducer((state, action) => {
    switch (action){
        case 1:
            setBirdData(Bluejay);
            break;
        case 2:
            setBirdData(Flicker);
            break;
        case 3:
            setBirdData(Nuthatch);
            break;
    }
  },1);

  return (
    <View style={styles.container}>
      <Bird birdData={birdData}/>

      <Pressable onPress={() => setBirdIndex(1)}>
        <Text>1</Text>
      </Pressable>
      <Pressable onPress={() => setBirdIndex(2)}>
          <Text>2</Text>
      </Pressable>
      <Pressable onPress={() => setBirdIndex(3)}>
          <Text>3</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
