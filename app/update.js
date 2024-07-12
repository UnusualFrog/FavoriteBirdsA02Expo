// Pre-defined
import { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Linking } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

// Components
import Button from '../components/button.js';
import { BirdContext } from '../components/BirdContext.js';

// Assets
import BirdData from '../birdData/BirdData.json';

export default function Page() {
  const db = useSQLiteContext();

  const {birdIndex, setBirdIndex} = useContext(BirdContext);

  const [DBResult, setDBResult] = useState(db[birdIndex]);

  const [newDBResult, setNewDBResult] = useState(db[birdIndex]);

  const [birdName, setBirdName] = useState("");
  const [birdColor, setBirdColor] = useState("");
  const [birdCategory, setBirdCategory] = useState("");
  const [birdBehavior, setBirdBehavior] = useState("");
  const [birdImageUri, setBirdImageUri] = useState("");

// Get row associated with bird at current index
  useEffect(() => {
        async function setup() {
            const sqlQuery = `SELECT * FROM birds WHERE id=${birdIndex+1}`
            const result = await db.getFirstAsync(sqlQuery);
            setDBResult(result);

            setBirdName(result.name);
            setBirdColor(result.color);
            setBirdCategory(result.category);
            setBirdBehavior(result.behavior);
            setBirdImageUri(result.imageURI);
        }
        setup();
  }, [newDBResult]);

  const updateRow = () => {
    async function update() {
            const sqlQuery = `
                UPDATE birds
                SET name="${birdName}",
                color="${birdColor}",
                category="${birdCategory}",
                behavior="${birdBehavior}",
                imageURI="${birdImageUri}"
                WHERE id=${birdIndex+1}
                `
            const result = await db.runAsync(sqlQuery);
            setNewDBResult(result);
        }
        update();
  };

    if (DBResult == null) {
        return (
        <Text>Loading</Text>
        )
    }

  return (
    <View style={styles.container}>
        <View style={styles.centerContainer}>
            <Text style={styles.h1}>
                Current Bird: {""}
                <Text style={styles.currentBirdName}>{DBResult["name"]}</Text>
            </Text>
        </View>

         <View style={styles.inputRow}>
            <Text style={styles.h2}>Name: </Text>
            <TextInput
                style={styles.input}
                onChangeText={setBirdName}
                value={birdName}
            />
        </View>

        <View style={styles.inputRow}>
            <Text style={styles.h2}>Color: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setBirdColor}
              value={birdColor}
            />
        </View>

        <View style={styles.inputRow}>
            <Text style={styles.h2}>Category: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setBirdCategory}
              value={birdCategory}
            />
        </View>

        <View style={styles.inputRow}>
            <Text style={styles.h2}>Behavior: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setBirdBehavior}
              value={birdBehavior}
            />
        </View>

        <View style={styles.inputRow}>
            <Text style={styles.h2}>Image URI: </Text>
            <TextInput
              style={styles.input}
               onChangeText={setBirdImageUri}
               value={birdImageUri}
            />
        </View>

        <Button label={"Update Info"} onPress={() => {updateRow()}}/>

        <Text style={styles.linkArea}>For ideas on new birds, check out the following link: {"\n"}
            <Pressable onPress={handlePress}><Text style={styles.link}>https://www.allaboutbirds.org/guide</Text></Pressable>
        </Text>
    </View>
  );
}

// Register link clicked
const handlePress = () => {
   Linking.openURL('https://www.allaboutbirds.org/guide');
}

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center',
        padding: 20,
      },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 230,
        marginTop: 4,
        marginBottom: 2,
        borderWidth: 1,
        padding: 10,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#000',
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#000',
    },
    currentBirdName: {
        fontSize: 32,
        fontWeight: 'normal',
        marginVertical: 10,
        color: 'blue',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
      },
    linkArea: {
        marginTop: 50,
    }
});