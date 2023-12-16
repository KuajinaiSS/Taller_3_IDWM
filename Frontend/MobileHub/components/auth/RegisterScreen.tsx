import {SafeAreaView} from "react-native-safe-area-context";
import {Image, ScrollView, StyleSheet, Text} from "react-native";
import {Button, HelperText, TextInput} from "react-native-paper";
// import Styles from "../../constants/Styles";
import {useState} from "react";
import {Link} from "expo-router";
import axios from "axios";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [rut, setRut] = useState("");
    const [bornYear, setBornYear] = useState("");
    const currentYear = new Date().getFullYear();

    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState("");


    const url = "http://192.168.4.43:5148/api/Auth/register";

    const data = {
        email: '',
        rut: '',
        username: '',
        bornYear: 0,
    };

    const handleEmailChange = (email: string) => {
        setEmail(email);
        console.log(email);
    }

    const handleNameChange = (name: string) => {
        setName(name);
        console.log(name);
    }

    const handleRutChange = (rut: string) => {
        setRut(rut);
        console.log(rut);
    }

    const handleBornYearChange = (bornYear: string) => {
        const numericValue = bornYear.replace(/[^0-9]/g, '');
        setBornYear(numericValue);
    };



    const handleSubmit = () => {

        if (!email || !name || !rut || !bornYear) {
            setMsgError("Por favor, rellene todos los campos");
            setError(true);
            return;
        }


        data.email = email;
        data.username = name;
        data.rut = rut;
        data.bornYear = parseInt(bornYear);
        console.log(data);

        axios.post(url, data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
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

                <TextInput style={styles.input} label="Rut" placeholder={"207344842"}
                           placeholderTextColor={"#B2B2B2"} mode={"outlined"} value={rut}
                           onChangeText={handleRutChange}/>


                <HelperText style={styles.helperText} type={"error"} visible={error}>
                    {msgError}
                </HelperText>


                <Button style={styles.button} icon="login" mode="contained" onPress={handleSubmit}>
                    Registrarse TRU
                </Button>


                <Link href={"/home/"} asChild>
                    <Button style={styles.button} icon="login" mode="contained" onPress={handleSubmit}>
                        Registrarse
                    </Button>
                </Link>

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