import { View, StyleSheet, Pressable, Text } from 'react-native';
import { router } from 'expo-router';

export default function NavBar() {
    const handleHome = () => {
        router.navigate('/');
    }
    const handleUpdate = () => {
        router.navigate('/update');
    }
    return (
        <View style={{ flexDirection:"row", justifyContent:"center"}}>
            <Pressable label={"Birds"} onPress = {handleHome} style={styles.button} >
                <Text style={styles.text}>Home</Text>
            </Pressable>
            <Pressable label={"Update"} onPress = {handleUpdate} style={styles.button} >
                <Text style={styles.text}>Update</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 15
  },
  text: {
    color: "white"
  }
});