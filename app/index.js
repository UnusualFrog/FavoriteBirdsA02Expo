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

  const [totalBirds, setTotalBirds] = useState(0);

// Get row associated with bird at current index
  useEffect(() => {
            async function getCurrentBird() {
                const sqlQuery = `SELECT * FROM birds WHERE id=${birdIndex+1}`
                const result = await db.getFirstAsync(sqlQuery);
                setDBResult(result);
            }
            async function getTotalBirds() {
                const sqlQuery = `SELECT * FROM birds`
                const result = await db.getAllAsync(sqlQuery);
                setTotalBirds(result.length);
            }
            getCurrentBird();
            getTotalBirds();

      }, [birdIndex]);

  const handleButton = (direction) => {
    let newIndex = birdIndex + direction;
    if (newIndex >= 0 && newIndex < totalBirds)
    setBirdIndex(newIndex);
  }

if (DBResult == null) {
    return (
    <Text>Loading</Text>
    )
}

  return (
  <View style={styles.container}>
    <Text style={styles.h1}>Top {totalBirds} Birds {"\n"}</Text>
    <Bird birdData={DBResult}/>
    <View style={styles.button_container}>
        <Button label={"<="} onPress={() => {handleButton(-1)}}/>
        <Button label={birdIndex}/>
        <Button label={"=>"} onPress={() => {handleButton(1)}}/>
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
  h1: {
      fontSize: 50,
      marginTop: 0.67,
      marginBottom: 0.67,
      marginLeft: 0,
      marginRight: 0,
      fontWeight: 'bold',
    },
});
