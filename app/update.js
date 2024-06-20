// Pre-defined
import { useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Linking } from 'react-native';

// Components
import Button from '../components/button.js';
import { BirdContext } from '../components/BirdContext.js';

// Assets
import BirdData from '../birdData/BirdData.json';

export default function Page() {
    const {birds, setBirds} = useContext(BirdContext);
    const currentBird = birds.birdData[birds.currentIndex];

    const [birdName, setBirdName] = useState(currentBird.name);
    const [birdColor, setBirdColor] = useState(currentBird.color);
    const [birdCategory, setBirdCategory] = useState(currentBird.category);
    const [birdBehavior, setBirdBehavior] = useState(currentBird.behavior);
    const [birdImageUri, setBirdImageUri] = useState(currentBird.imageUri);

    // Create new bird object and overwrite the object at the current index
    const updateBirdInfo = (index) => {
          const latestData = {
              "name": birdName,
              "color": birdColor,
              "category": birdCategory,
              "behavior": birdBehavior,
              "imageUri": birdImageUri
          }
          setBirds({"currentIndex": index, "newBird": latestData});
    }

    // Register link clicked
    const handlePress = () => {
       Linking.openURL('https://www.allaboutbirds.org/guide');
    }

  return (
    <View style={styles.container}>
        <View style={styles.centerContainer}>
            <Text style={styles.h1}>
                Current Bird: {""}
                <Text style={styles.currentBirdName}>{currentBird.name}</Text>
            </Text>
        </View>

        <Text>For ideas on new birds, check out the following link: {"\n"}
            <Pressable style={styles.link} onPress={handlePress}> https://www.allaboutbirds.org/guide </Pressable>
        </Text>

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

        <Button label={"Update Info"} onPress={() => {updateBirdInfo(birds.currentIndex)}}/>
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
        marginVertical: 20,
    },
    input: {
        height: 40,
        width: 400,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
});