import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Button from './button';

export default function NavBar() {
    const handleHome = () => {
        router.navigate('/');
    }
    const handleUpdate = () => {
        router.navigate('/update');
    }
    const handleNew = () => {
        router.navigate('/new_bird');
    }
    return (
        <View style={styles.container}>
            <Button label={"Top 3 Birds"} onPress = {handleHome} />
            <Button label={"Update Bird"} onPress = {handleUpdate} />
            <Button label={"New Bird"} onPress = {handleNew} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around", // or "space-between"
        alignItems: "center",
        paddingHorizontal: 10, // adjust as needed
    },
});