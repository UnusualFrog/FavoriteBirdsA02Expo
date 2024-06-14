import { Slot } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import Navbar from '../components/navbar.js'
import { BirdContext } from '../components/BirdContext';
import { useState } from 'react';
import Bluejay from '../birdData/Bluejay.json';

export default function HomeLayout() {
  const [birdData, setBirdData] = useState(Bluejay);

  return (
      <>
        <Navbar/>
        <View>
            <BirdContext.Provider value={{birdData, setBirdData}}>
                <Slot />
            </BirdContext.Provider>
        </View>
      </>
    )
}
