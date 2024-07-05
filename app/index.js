//Pre-defined
import { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

// Components
import Bird from '../components/bird.js'
import Button from '../components/button.js'
import { BirdContext } from '../components/BirdContext.js';

// Assets
import birdData from '../birdData/BirdData.json'
import Bluejay from '../birdData/Bluejay.json'
import Flicker from '../birdData/Flicker.json'
import Nuthatch from '../birdData/Nuthatch.json'

export default function Page() {
  const {birds, setBirds} = useContext(BirdContext);

  const [birdsIndex, setBirdsIndex] = useState(0);

  const db = useSQLiteContext();

  useEffect(() => {
            async function setup() {
              const result = await db.getFirstAsync('SELECT * FROM movies');
              console.log(result);
//              setMovie(result);
            }
            setup();
      }, []);

  return (
  <View style={styles.container}>
    <Bird birdData={birds.birdData[birds.currentIndex]}/>
    <View style={styles.button_container}>
        <Button label={birds.birdData[0].name} onPress={() => {setBirds({"currentIndex": 0, "newBird": {}})}}/>
        <Button label={birds.birdData[1].name} onPress={() => {setBirds({"currentIndex": 1, "newBird": {}})}}/>
        <Button label={birds.birdData[2].name} onPress={() => {setBirds({"currentIndex": 2, "newBird": {}})}}/>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
      },
    button_container: {
        flexDirection: "row",
      },
});
