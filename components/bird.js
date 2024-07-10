import { StyleSheet, Text, View, Image } from 'react-native';

import {useState} from 'react';

export default function Bird({birdData}) {
    return (
    <View>
        <Text style={styles.h1}>Top 3 Birds {"\n"}</Text>

        <Text style={styles.h2}>{birdData.name}</Text>
        <Image
                style={styles.image}
                source={{
                  uri: birdData.imageURI
                }}
              />

        <Text style={styles.dataRow}><Text style={styles.bold}>Color:</Text> {birdData.color}</Text>
        <Text style={styles.dataRow}><Text style={styles.bold}>Category:</Text> {birdData.category}</Text>
        <Text style={styles.dataRow}><Text style={styles.bold}>Behavior:</Text> {birdData.behavior}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 300,
  },
  h1: {
    fontSize: 50,
    marginTop: 0.67,
    marginBottom: 0.67,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: 'bold',
  },
  h2: {
      fontSize: 35,
      marginTop: 0.67,
      marginBottom: 0.67,
      marginLeft: 0,
      marginRight: 0,
      fontWeight: 'bold',
    },
  bold: {
    fontWeight: 'bold',
  },
  dataRow: {
    fontSize: 18,
    marginBottom: 10,
  }
});