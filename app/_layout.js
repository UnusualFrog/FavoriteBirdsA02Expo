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

export default function HomeLayout() {
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
        CREATE TABLE IF NOT EXISTS birds (id INTEGER PRIMARY KEY, name TEXT NOT NULL, color TEXT NOT NULL, category TEXT NOT NULL, behavior TEXT NOT NULL, imageURI TEXT NOT NULL);
    `);
     const result = await db.getAllAsync('SELECT * FROM birds');
    if( result.length == 0 ) {
        await db.runAsync('INSERT INTO birds (name, color, category, behavior, imageURI) VALUES (?, ?, ?, ?, ?)', "Bluejay", "Blue", "Crows, Magpies, Jays Perching Birds", "Direct Flight, Flap/Glide, Hovering, Undulating", "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/311635911/900");
        await db.runAsync('INSERT INTO birds (name, color, category, behavior, imageURI) VALUES (?, ?, ?, ?, ?)', "Northern Flicker", "Brown with Speckles", "Picidae, Woodpeckers, Tree-clinging Birds", "Flap/Glide, Undulating", "https://www.allaboutbirds.org/guide/assets/og/615440015-1200px.jpg");
        await db.runAsync('INSERT INTO birds (name, color, category, behavior, imageURI) VALUES (?, ?, ?, ?, ?)', "Redbreasted Nuthatch", "Grayish Blue with Red Belly", "Nuthatches, Tree-clinging Birds", "Flitter, Undulating", "https://www.allaboutbirds.org/guide/assets/photo/308563981-480px.jpg");
    }
    const firstRow = await db.getFirstAsync('SELECT * FROM birds WHERE id=2');
}
