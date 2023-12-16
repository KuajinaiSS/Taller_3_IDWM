import {SafeAreaView} from "react-native-safe-area-context";
import {Button, Text} from "react-native-paper";
import {Image, StyleSheet} from "react-native";

import Colors from "../constants/Colors";
import {Link} from "expo-router";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 20,
    },
    button: {
        width: '100%',
    },
    image: {
        width: 150,
        height: 150,
    },
});

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>

            <Image source={require('../assets/images/MobileHub.png')} style={styles.image}/>


            <Link href="/auth/login" asChild>
                <Button style={styles.button} icon="login" mode="contained" onPress={() => console.log('Login')}>
                    Iniciar sesión
                </Button>
            </Link>

            <Link href={"/auth/register"} asChild>
                <Button style={styles.button} icon="" mode={"outlined"} onPress={() => console.log('Register')}>
                    Registrarse
                </Button>
            </Link>

        </SafeAreaView>
    );
}


export default HomeScreen;
