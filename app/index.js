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

  const [currentBird, setCurrentBIrd] = useState({})

  const db = useSQLiteContext();

  useEffect(() => {
            async function setup() {
              console.log(birds.currentIndex);
              const result = await db.getAllAsync('SELECT * FROM movies');
              console.log("DB Result: ", result[birds.currentIndex]);
              setCurrentBIrd(result[birds.currentIndex]);
            }
            setup();
      }, [birds]);
  console.log("JSON: ", birds.birdData[birds.currentIndex]);
  return (
  <View style={styles.container}>
    <Bird birdData={currentBird}/>
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
