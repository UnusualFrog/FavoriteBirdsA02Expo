// Pre-defined
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState} from 'react';
import { useSQLiteContext } from 'expo-sqlite';

// Components
import Button from '../components/button.js';


export default function NavBar() {
    const db = useSQLiteContext();

    const [birdName, setBirdName] = useState("");
    const [birdColor, setBirdColor] = useState("");
    const [birdCategory, setBirdCategory] = useState("");
    const [birdBehavior, setBirdBehavior] = useState("");
    const [birdImageUri, setBirdImageUri] = useState("");

    const addRow = () => {
        async function add() {
                const result = await db.runAsync('INSERT INTO birds (name, color, category, behavior, imageURI) VALUES (?, ?, ?, ?, ?)', birdName, birdColor, birdCategory, birdBehavior, birdImageUri);
            }
            add();
      };

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Add A New Bird</Text>

            <View style={styles.inputRow}>
                <Text style={styles.h2}>Name: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setBirdName}
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.h2}>Color: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setBirdColor}
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.h2}>Category: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setBirdCategory}
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.h2}>Behavior: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setBirdBehavior}
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.h2}>Image URI: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setBirdImageUri}
                />
            </View>

            <Button label={"Add Bird"} onPress={() => {addRow()}}/>
        </View>
    );
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