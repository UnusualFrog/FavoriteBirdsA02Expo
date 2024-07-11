// Pre-defined
import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import { Slot } from 'expo-router';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

// Components
import Navbar from '../components/navbar';
import { BirdContext } from '../components/BirdContext.js'

// Assets
import BirdData from '../birdData/BirdData.json'
import Bluejay from '../birdData/Bluejay.json';

// Update index of selected bird, and overwrite bird at index if new bird data is not blank
/*const reducer = (state, action) => {
        let newState = { ...state, currentIndex: action.currentIndex };

        if (Object.keys(action.newBird).length !== 0) {
            newState.birdData[newState.currentIndex] = action.newBird;
        }

        return newState;
    }*/


export default function HomeLayout() {
  /*const [birds, setBirds] = useReducer(reducer, {"birdData": [...BirdData], "currentIndex": 0});*/
  const [birdIndex, setBirdIndex] = useState(0);

  return (
       <View>
            <SQLiteProvider databaseName="movies3.db" onInit={initializeDB}>
                <Text>{"\n"}</Text>
                <Navbar />
                <BirdContext.Provider value={{birdIndex, setBirdIndex}}>
                    <Slot />
                </BirdContext.Provider>
            </SQLiteProvider>
       </View>
   );
}

async function initializeDB(db) {
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        DROP TABLE IF EXISTS movies;
        CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY, name TEXT NOT NULL, color TEXT NOT NULL, category TEXT NOT NULL, behavior TEXT NOT NULL, imageURI TEXT NOT NULL);
    `);
     const result = await db.getAllAsync('SELECT * FROM movies');
    if( result.length == 0 ) {
        await db.runAsync('INSERT INTO movies (name, color, category, behavior, imageURI) VALUES (?, ?, ?, ?, ?)', "Bluejay", "Blue", "Crows, Magpies, Jays Perching Birds", "Direct Flight, Flap/Glide, Hovering, Undulating", "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/311635911/900");
        await db.runAsync('INSERT INTO movies (name, color, category, behavior, imageURI) VALUES (?, ?, ?, ?, ?)', "Northern Flicker", "Brown with Speckles", "Picidae, Woodpeckers, Tree-clinging Birds", "Flap/Glide, Undulating", "https://www.allaboutbirds.org/guide/assets/og/615440015-1200px.jpg");
        await db.runAsync('INSERT INTO movies (name, color, category, behavior, imageURI) VALUES (?, ?, ?, ?, ?)', "Redbreasted Nuthatch", "Grayish Blue with Red Belly", "Nuthatches, Tree-clinging Birds", "Flitter, Undulating", "https://www.allaboutbirds.org/guide/assets/photo/308563981-480px.jpg");
    }
    const firstRow = await db.getFirstAsync('SELECT * FROM movies WHERE id=2');
//    console.log(firstRow.id,firstRow.name, firstRow.color, firstRow.category, firstRow.behavior);
}
