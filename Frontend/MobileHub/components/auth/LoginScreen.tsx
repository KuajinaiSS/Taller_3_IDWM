import {SafeAreaView} from "react-native-safe-area-context";
import {Image, StyleSheet, Text} from "react-native";
import {Button, HelperText, TextInput} from "react-native-paper";
import * as SecureStore from 'expo-secure-store';
import {useEffect, useState} from "react";
import {router} from "expo-router";
import axios from "axios";


const LoginScreen = () => {
    const url = "http://192.168.4.43:5148/api/Auth/login";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [HidePassword, setHidePassword] = useState(true);
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState("");
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const data = {
        email: '',
        password: ''
    };

    /**
     * Verifica si el usuario ya inició sesión anteriormente y lo redirige a la pantalla de inicio mediante el token
     * Si el usuario no ha iniciado sesión, lo deja en la pantalla de inicio de sesión
     */
    useEffect(() => {
        SecureStore.getItemAsync("token")
            .then((token) => {
                console.log("LOGIN: " + token)
                if (token) {
                    router.replace("/home", {email: token});
                }
            });
    }, []);


    /**
     * Actualiza el estado del email con el valor del input de email
     * @param email valor del input de email
     */
    const handleEmailChange = (email: any) => {
        setEmail(email);
        console.log(email);
    }


    /**
     * Actualiza el estado de la contraseña con el valor del input de contraseña
     * @param password valor del input de contraseña
     */
    const handlePasswordChange = (password: string) => {
        setPassword(password);
        console.log(password);
    }


    /**
     * Actualiza el estado de HidePassword para mostrar o no la contraseña
     */
    const handleShowPassword = () => {
        setHidePassword(!HidePassword);
        console.log("Show password");
    }


    /**
     * Valida los datos de inicio de sesión
     * Si los datos son válidos, inicia sesión y guarda el token en el almacenamiento seguro del dispositivo (SecureStore)
     * Si los datos no son válidos, muestra un mensaje de error
     */
    const handleSubmit = async () => {
        setLoading(true);
        setDisabled(true);

        if (!email || !password) {
            setMsgError("Por favor, rellene todos los campos");
            setError(true);
            setLoading(false);
            setDisabled(false);
            return;
        }

        data.email = email;
        data.password = password;

        axios.post(url, data)
            .then(async (response) => {
                console.log(response.data);
                await SecureStore.setItemAsync("token", response.data);
                router.replace("/home", {email: data.email});
            })
            .catch((error) => {
                console.log(error.response.data);
                setMsgError("Email o la Contraseña es Invalida :c");
                setError(true);
            })
            .finally(() => {
                setLoading(false);
                setDisabled(false);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/images/MobileHub.png')} style={styles.image}/>
            <Text style={styles.title}> ¡Bienvenido! </Text>

            <TextInput style={styles.input} label="Email" placeholder="nombre@alumnos.ucn.cl"
                       placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"} value={email}
                       onChangeText={handleEmailChange}/>

            <TextInput style={styles.input} label="Contraseña" placeholder={"20734484-2"}
                       placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"} value={password}
                       onChangeText={handlePasswordChange} secureTextEntry={HidePassword}
                       right={
                           <TextInput.Icon icon={HidePassword ? "eye-off" : "eye"} onPress={handleShowPassword}/>
                       }/>

            <HelperText style={styles.helperText} type={"error"} visible={error}>
                {msgError}
            </HelperText>

            <Button style={styles.button} icon="login" mode="contained" onPress={handleSubmit} loading={loading}
                    disabled={disabled}>
                Iniciar sesión
            </Button>
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