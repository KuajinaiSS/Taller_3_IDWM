import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button, HelperText, TextInput} from "react-native-paper";
import {useState} from "react";
import {router} from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

/**
 * Guarda el token en el almacenamiento seguro del dispositivo (SecureStore)
 * @param key nombre del token
 * @param value valor del token
 */
async function saveToken(key: string, value: any) {
    await SecureStore.setItemAsync(key, value);
}


/**
 * Pantalla de registro
 */
const RegisterScreen = () => {
    const url = "http://192.168.4.43:5148/api/Auth/register";
    const data = {
        email: '',
        rut: '',
        username: '',
        yearBirth: 0,
    };


    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [rut, setRut] = useState("");
    const [bornYear, setBornYear] = useState("");
    const currentYear = new Date().getFullYear();
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState("");
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);


    /**
     * cambia el email del usuario
     * @param email email del usuario
     */
    const handleEmailChange = (email: string) => {
        setEmail(email);
        console.log(email);
    }

    /**
     * cambia el nombre del usuario
     * @param name nombre del usuario
     */
    const handleNameChange = (name: string) => {
        setName(name);
        console.log(name);
    }

    /**
     * cambia el rut del usuario
     * @param rut rut del usuario
     */
    const handleRutChange = (rut: string) => {
        setRut(rut);
        console.log(rut);
    }

    /**
     * cambia el año de nacimiento del usuario
     * @param bornYear año de nacimiento del usuario
     */
    const handleBornYearChange = (bornYear: string) => {
        const numericValue = bornYear.replace(/[^0-9]/g, '');
        setBornYear(numericValue);
    };


    /**
     * envia los datos al backend para registrarse
     * si no se rellenan todos los campos, muestra un mensaje de error
     * si se rellenan todos los campos, envia los datos al backend
     * si el backend responde con un error, muestra un mensaje de error
     * si el backend responde con un token, guarda el token en el almacenamiento seguro del dispositivo (SecureStore) y redirige a la pantalla de inicio
     */
    const handleSubmit = () => {
        setLoading(true)
        if (!email || !name || !rut || !bornYear) {
            setMsgError("Por favor, rellene todos los campos");
            setError(true);
            setLoading(false);
            setDisabled(false);
            return;
        }

        data.email = email;
        data.username = name;
        data.rut = rut;
        data.yearBirth = parseInt(bornYear);
        console.log(data);

        axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                saveToken("token", response.data);
                router.replace("/home", {email: data.email});
            })
            .catch((error) => {
                console.log("Error: " + error.response.data);
            }).finally(() => {
                setLoading(false);
                setDisabled(false);
            });

    };


    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}> ¡Registrate! </Text>

            <ScrollView style={styles.scrollView}>

                <TextInput style={styles.input} label="Nombre" placeholder={"Italo Donoso"}
                           placeholderTextColor={"#B2B2B2"} autoComplete={"name"} mode={"outlined"} value={name}
                           onChangeText={handleNameChange}/>

                <TextInput style={styles.input} label="Email" placeholder="nombre@alumnos.ucn.cl"
                           placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"} value={email}
                           onChangeText={handleEmailChange}/>

                <TextInput style={styles.input} label="Año de Nacimiento" placeholder={"2001"}
                           placeholderTextColor={"#B2B2B2"} autoComplete={"birthdate-year"} mode={"outlined"}
                           value={bornYear} keyboardType="numeric"
                           onChangeText={handleBornYearChange}/>

                <TextInput style={styles.input} label="Rut" placeholder={"20734484-2"}
                           placeholderTextColor={"#B2B2B2"} mode={"outlined"} value={rut}
                           onChangeText={handleRutChange}/>


                <HelperText style={styles.helperText} type={"error"} visible={error}>
                    {msgError}
                </HelperText>


                <Button style={styles.button} icon="account-plus" mode="contained" onPress={handleSubmit}
                        loading={loading} disabled={disabled}>
                    Registrarse
                </Button>


            </ScrollView>

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
        marginTop: 15,
    },
    input: {
        width: '100%',
        marginBottom: 20,
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
    },
    scrollView: {
        width: '95%',
        gap: 15,
        margin: 0,
        padding: 0,
    },
});

export default RegisterScreen;