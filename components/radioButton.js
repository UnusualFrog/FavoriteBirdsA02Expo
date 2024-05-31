
import { StyleSheet, Text, View, Pressable } from 'react-native';



export default function RadioButton({buttonText, buttonPushed, onPress}) {

    return (
     <>
        <Pressable style={buttonText == buttonPushed ? styles.buttonPushed : styles.button} onPress={onPress}>
            <Text style={styles.text}>{buttonText}</Text>
        </Pressable>
     </>
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
  buttonPushed: {
    borderRadius: 10,
    backgroundColor: '#00308F',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 15
  },
  text: {
    color: "white"
  }
});