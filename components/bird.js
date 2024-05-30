import { StyleSheet, Text, View, Image } from 'react-native';

import {useState} from 'react';

export default function Bird({birdData}) {
    return (
    <>
        <Text style={styles.h1}>{birdData.name}</Text>
        <Image
                style={styles.image}
                source={{
                  uri: birdData.imageUri
                }}
              />

        <Text>{birdData.color}</Text>
    </>
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
  }
});