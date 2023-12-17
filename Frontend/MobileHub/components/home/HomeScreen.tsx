import {ActivityIndicator, Button, Card, Text, Appbar, Portal, Modal, TextInput} from 'react-native-paper';
import {ScrollView, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {Repository} from "../../models/Repository";
import axios from "axios";
import {router} from "expo-router";
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from "jwt-decode";
import {Commit} from "../../models/Commit";

const getTokenAndPrint = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        console.log('Token:', token);
        return token;
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
    }
};


const HomeScreen = () => {
    const url = "http://192.168.4.43:5148/Repositories";
    const [commits, setCommits] = useState<Commit[]>([]);

    async function getValueFor(key) {
        const result = await SecureStore.getItemAsync(key);
        setToken(result);
    }

    const Newdata = {
        email: '',
        password: '',
        username: '',
        yearBirth: 0,
    };
    const Logeduser = {
        id: 0,
        email: '',
        password: '',
        username: '',
        yearBirth: 0,
    };


    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [bornYear, setBornYear] = useState("");
    const [HidePassword, setHidePassword] = useState(true);
    const [token, setToken] = useState("");
    const handleEmailChange = (email: string) => {
        setEmail(email);
        console.log(email);
    }
    const handleNameChange = (name: string) => {
        setName(name);
        console.log(name);
    }
    const handleBornYearChange = (bornYear: string) => {
        const numericValue = bornYear.replace(/[^0-9]/g, '');
        setBornYear(numericValue);
    };
    const handlePasswordChange = (password: string) => {
        setPassword(password);
        console.log(password);
    }
    const handleShowPassword = () => {
        setHidePassword(!HidePassword);
        console.log("Show password");
    }

    const [visible, setVisible] = useState(false);
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = await getTokenAndPrint();
                setToken(token);

                const response = await axios.get(url);
                setRepositories(response.data);

            } catch (error) {
                console.log("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const removeToken = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            console.log('Token eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el token:', error);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loading}>
                <Text variant={"displaySmall"}>Repositorios</Text>
                <ActivityIndicator animating={true} color={"#000"} size={"large"}/>
                <Text variant={"bodySmall"}>Cargando...</Text>
            </SafeAreaView>
        );
    }

    const handleCommits = async (name: string) => {
        axios.get(url + "/" + name)
            .then((response) => {
                console.log(response.data);
                setCommits(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEdit = async () => {
        console.log(token);
        const decodedToken = jwtDecode(token, {header: true});

    }


    const handleLogout = async () => {
        await removeToken();
        router.replace('/');
    }

    return (
        <>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Content title="Repositorios"/>
                <Appbar.Action icon="account-edit" onPress={() => setVisible(true)}/>
                <Appbar.Action icon="exit-to-app" onPress={handleLogout}/>
            </Appbar.Header>

            <SafeAreaView style={styles.container}>

                <ScrollView style={styles.scrollView}>
                    {repositories.map((repository) => {
                        return (
                            <Card style={styles.card} key={repository.name}>
                                <Card.Title title={repository.name} titleVariant={"headlineSmall"}/>

                                <Card.Content>
                                    <Text variant={"bodySmall"}>Creado el: {repository.createdAt.split("T")[0]}</Text>
                                    <Text variant={"bodySmall"}>Actualizado
                                        el: {repository.updateAt.split("T")[0]}</Text>
                                    <Text variant={"bodySmall"}>Commits: {repository.commitsAmount}</Text>
                                </Card.Content>

                                <Card.Actions>
                                    <Button mode={"contained"} >
                                        <Text variant={"bodySmall"}> Ver detalles</Text>
                                    </Button>
                                </Card.Actions>
                            </Card>
                        );
                    })}
                </ScrollView>


                <Portal>
                    <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
                        <Text style={styles.title}>Editar usuario</Text>

                        <TextInput style={styles.input} label="Nombre" placeholder={"Italo Donoso"}
                                   placeholderTextColor={"#B2B2B2"} autoComplete={"name"} mode={"outlined"} value={name}
                                   onChangeText={handleNameChange}/>

                        <TextInput style={styles.input} label="Email" placeholder="nombre@alumnos.ucn.cl"
                                   placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"}
                                   value={email}
                                   onChangeText={handleEmailChange}/>

                        <TextInput style={styles.input} label="Año de Nacimiento" placeholder={"2001"}
                                   placeholderTextColor={"#B2B2B2"} autoComplete={"birthdate-year"} mode={"outlined"}
                                   value={bornYear} keyboardType="numeric"
                                   onChangeText={handleBornYearChange}/>

                        <TextInput style={styles.input} label="Contraseña" placeholder={"207344842"}
                                   placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"}
                                   value={password}
                                   onChangeText={handlePasswordChange} secureTextEntry={HidePassword}
                                   right={
                                       <TextInput.Icon icon={HidePassword ? "eye-off" : "eye"}
                                                       onPress={handleShowPassword}/>
                                   }/>


                        <Button mode="contained" style={styles.button} onPress={handleEdit}>
                            Editar
                        </Button>

                        <Button mode={"outlined"} style={styles.button} onPress={() => setVisible(false)}>
                            Cancelar
                        </Button>
                    </Modal>
                </Portal>


            </SafeAreaView>
        </>
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
        marginTop: 10,
    },
    input: {
        width: '100%',
        margin: 5,
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
    card: {
        width: '100%',
        marginTop: 20,
        backgroundColor: "#F5F5F5",
        justifyContent: 'center',

    },
    scrollView: {
        width: '95%',
        gap: 15,
        margin: 0,
        padding: 0,
    },
    loading: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.07)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appBar: {
        width: '100%',
        backgroundColor: "#fcaf43",// naranjo

    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 5,
    }
});
export default HomeScreen;