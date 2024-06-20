// Pre-defined
import { useState, useReducer } from 'react';
import { Slot } from 'expo-router';

// Components
import Navbar from '../components/navbar';
import { BirdContext } from '../components/BirdContext.js'

// Assets
import BirdData from '../birdData/BirdData.json'
import Bluejay from '../birdData/Bluejay.json';

// Update index of selected bird, and overwrite bird at index if new bird data is not blank
const reducer = (state, action) => {
        let newState = { ...state, currentIndex: action.currentIndex };

        if (Object.keys(action.newBird).length !== 0) {
            newState.birdData[newState.currentIndex] = action.newBird;
        }

        return newState;
    }


export default function HomeLayout() {
  const [birds, setBirds] = useReducer(reducer, {"currentIndex": 0, "birdData": [...BirdData], });

  return (
       <>
            <Navbar />
            <BirdContext.Provider value={{birds, setBirds}}>
                <Slot />
            </BirdContext.Provider>
       </>
   );
}
