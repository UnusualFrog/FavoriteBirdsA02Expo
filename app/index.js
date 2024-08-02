//Pre-defined
import { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

// Components
import Bird from '../components/bird.js'
import notButton from '../components/button.js'
import { BirdContext } from '../components/BirdContext.js';

// Assets
import birdData from '../birdData/BirdData.json'
import Bluejay from '../birdData/Bluejay.json'
import Flicker from '../birdData/Flicker.json'
import Nuthatch from '../birdData/Nuthatch.json'

// Component Library
import {Button, Icon} from '@rneui/themed';

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
   <View style={styles.iconContainer}>
       <Icon
        name='loader'
        type='feather'
        raised
         size={100}
       />
   </View>
    )
}

  return (
  <View style={styles.container}>
    <Text style={styles.h1}>Top {totalBirds} Birds</Text>
    <Bird birdData={DBResult}/>
    <View style={styles.button_container}>
        <Button title={"<="} onPress={() => {handleButton(-1)}} buttonStyle={styles.button} titleStyle={styles.button_title}/>
        <Button title={`${birdIndex+1}`} buttonStyle={styles.button} titleStyle={styles.button_title}/>
        <Button title={"=>"} onPress={() => {handleButton(1)}} buttonStyle={styles.button} titleStyle={styles.button_title}/>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
      },
  iconContainer: {
           marginTop: 200,
           alignItems: 'center',
         },
  h1: {
      fontSize: 50,
      fontWeight: 'bold',
      paddingVertical: 0,
      marginVertical: 0,
    },
  button: {
    backgroundColor: 'rgba(111, 202, 186, 1)',
    borderRadius: 5,
    width: 100,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  button_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button_title: {
    fontWeight: 'bold',
    fontSize: 23,
  },
});
