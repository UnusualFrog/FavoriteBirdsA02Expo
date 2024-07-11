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
  const db = useSQLiteContext();

  const {birdIndex, setBirdIndex} = useContext(BirdContext);

  const [DBResult, setDBResult] = useState(db[birdIndex])

// Get row associated with bird at current index
  useEffect(() => {
            async function setup() {
                const sqlQuery = `SELECT * FROM movies WHERE id=${birdIndex+1}`
                console.log(sqlQuery);
                const result = await db.getFirstAsync(sqlQuery);
                console.log("DB Result: ", result);
                setDBResult(result);
            }
            setup();
      }, [birdIndex]);


if (DBResult == null) {
    return (
    <Text>Loading</Text>
    )
}

  return (
  <View style={styles.container}>
    <Bird birdData={DBResult}/>
    <View style={styles.button_container}>
        <Button label={1} onPress={() => {setBirdIndex(0)}}/>
        <Button label={2} onPress={() => {setBirdIndex(1)}}/>
        <Button label={3} onPress={() => {setBirdIndex(2)}}/>
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
