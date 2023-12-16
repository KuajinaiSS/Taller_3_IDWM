import {SafeAreaView} from "react-native-safe-area-context";
import {Image, StyleSheet, Text} from "react-native";
import {Button, HelperText, TextInput} from "react-native-paper";
// import Styles from "../../constants/Styles";
import {useContext, useEffect, useState} from "react";
import {Link} from "expo-router";
import axios from "axios";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [HidePassword, setHidePassword] = useState(true);

    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState("");

    const url = "http://192.168.4.43:5148/api/Auth/login";

    const data = {
        email: '',
        rut: ''
    };


    const handleEmailChange = (email: string) => {
        setEmail(email);
        console.log(email);
    }

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        console.log(password);
    }

    const handleShowPassword = () => {
        setHidePassword(!HidePassword);
        console.log("Show password");
    }


    const handleSubmit = () => {
        if (!email || !password) {
            setMsgError("Por favor, rellene todos los campos");
            setError(true);
            return;
        }

        data.rut = password;
        data.email = email;

        axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
            })
            .catch((error) => {
                console.log(error.response.data);
                setMsgError("Email o la Contraseña es Invalida :c");
                setError(true);
            });
    }


    return (
        <SafeAreaView style={styles.container}>

            <Image source={require('../../assets/images/MobileHub.png')} style={styles.image}/>
            <Text style={styles.title}> ¡Bienvenido! </Text>

            <TextInput style={styles.input} label="Email" placeholder="nombre@alumnos.ucn.cl"
                       placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"} value={email}
                       onChangeText={handleEmailChange}/>

            <TextInput style={styles.input} label="Contraseña" placeholder={"207344842"}
                       placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"} value={password}
                       onChangeText={handlePasswordChange} secureTextEntry={HidePassword}
                       right={
                           <TextInput.Icon icon={HidePassword ? "eye-off" : "eye"} onPress={handleShowPassword}/>
                       }/>


            <HelperText style={styles.helperText} type={"error"} visible={error}>
                {msgError}
            </HelperText>


            <Button style={styles.button} icon="login" mode="contained" onPress={handleSubmit}>
                Iniciar sesión TRU
            </Button>

            <Link href={"/home/"} asChild>
                <Button style={styles.button} icon="login" mode="contained" onPress={handleSubmit}>
                    Iniciar sesión
                </Button>
            </Link>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 0,
        gap: 20,
    },
    button: {
        width: '100%',
    },
    input: {
        width: '100%',
    },
    image: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    helperText: {
        backgroundColor: "rgba(255,0,0,0.14)",
        width: '100%',
        textAlign: 'center',
        borderRadius: 5,
    }
});

export default LoginScreen;