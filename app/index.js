//Pre-defined
import { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Components
import Bird from '../components/bird.js'
import Button from '../components/button.js'
import { BirdContext } from '../components/BirdContext.js';

// Assets
//import birdData from '../birdData/BirdData.json'
import Bluejay from '../birdData/Bluejay.json'
import Flicker from '../birdData/Flicker.json'
import Nuthatch from '../birdData/Nuthatch.json'

export default function Page() {
  const {bird, setBird} = useContext(BirdContext);

  const handleButtonPress = (currentBird) => {
    setBird(currentBird);
  }

  return (
  <View>
    <Bird birdData={bird}/>
    <View style={styles.button_container}>
        <Button label={"Bluejay"} onPress={() => {handleButtonPress(Bluejay)}}/>
        <Button label={"Flicker"} onPress={() => {handleButtonPress(Flicker)}}/>
        <Button label={"Nuthatch"} onPress={() => {handleButtonPress(Nuthatch)}}/>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    button_container: {
        flexDirection: "row",
      },
});
