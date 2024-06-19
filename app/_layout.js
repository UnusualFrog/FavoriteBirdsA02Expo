// Pre-defined
import { useState } from 'react';
import { Slot } from 'expo-router';

// Components
import Navbar from '../components/navbar';
import { BirdContext } from '../components/BirdContext.js'

// Assets
import Bluejay from '../birdData/Bluejay.json';

export default function HomeLayout() {
    const [bird, setBird] = useState(Bluejay);

  return (
       <>
            <Navbar />
            <BirdContext.Provider value={{bird, setBird}}>
                <Slot />
            </BirdContext.Provider>
       </>
   );
}
