import {ActivityIndicator, Button, Card, Text, Appbar, Portal, Modal, TextInput} from 'react-native-paper';
import {ScrollView, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {Repository} from "../../models/Repository";
import axios from "axios";
import {router, useLocalSearchParams} from "expo-router";
import * as SecureStore from 'expo-secure-store';

import React from "react";
import {User} from "../../models/User";
import {Commit} from "../../models/Commit";


/**
 * Pantalla de inicio
 */
const HomeScreen = () => {
    const url = "http://192.168.4.43:5148/Repositories";

    const [commits, setCommits] = useState<Commit[]>([]);
    const [HidePassword, setHidePassword] = useState(true);
    const [visible, setVisible] = useState(false);
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [user, setUser] = useState<User>({
        email: "",
        username: "",
        password: "",
        yearBirth: 0,
        id: 0,
        rut: ""
    });


    /**
     * Obtiene los repositorios del usuario logeado
     * y coloca el estado de isLoading en true mientras se obtienen los datos
     */
    useEffect(() => {
        setIsLoading(true);
        axios.get(url)
            .then((response) => {
                setRepositories(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);


    /**
     * Actualiza los datos del usuario logeado segun el campo y el valor ingresado
     * @param field nombre del campo a actualizar
     * @param value valor del campo a actualizar
     */
    const handleUserChange = (field: string, value: string) => {
        setUser({...user, [field]: value});
        console.log(user);
    }


    /**
     * Actualiza el estado de HidePassword para mostrar o no la contraseña
     */
    const handleShowPassword = () => {
        setHidePassword(!HidePassword);
        console.log("Show password");
    }

    /**
     * Actualiza los datos del usuario logeado [TODO]
     */
    const handleEdit = async () => {
    }

    /**
     * Cierra la sesión del usuario
     * Elimina el token del almacenamiento seguro del dispositivo (SecureStore)
     * Redirige a la pantalla de inicio
     */
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('token');
        router.replace("/", {email: ""});
    }

    /**
     * Obtiene los commits de un repositorio [NO FUNCIONA]
     * @param name nombre del repositorio
     */
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


    if (isLoading) {
        return (
            <SafeAreaView style={styles.loading}>
                <Text variant={"displaySmall"}>Repositorios</Text>
                <ActivityIndicator animating={true} color={"#000"} size={"large"}/>
                <Text variant={"bodySmall"}>Cargando...</Text>
            </SafeAreaView>
        );
    }

    return (
        <>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Content title={"userEmail"}/>
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
                                    <Button mode={"contained"}>
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
                                   placeholderTextColor={"#B2B2B2"} autoComplete={"name"} mode={"outlined"}
                                   value={user.username}
                                   id={"username"} onChangeText={(text) => handleUserChange("username", text)}/>

                        <TextInput style={styles.input} label="Email" placeholder="nombre@alumnos.ucn.cl"
                                   placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"}
                                   value={user.email}
                                   id={"email"} onChangeText={(text) => handleUserChange("email", text)}/>

                        <TextInput style={styles.input} label="Año de Nacimiento" placeholder={"2001"}
                                   placeholderTextColor={"#B2B2B2"} autoComplete={"birthdate-year"} mode={"outlined"}
                                   value={String(user.yearBirth)} keyboardType="numeric"
                                   id={"yearBirth"} onChangeText={(text) => handleUserChange("yearBirth", text)}/>

                        <TextInput style={styles.input} label="Contraseña" placeholder={"207344842"}
                                   placeholderTextColor={"#B2B2B2"} autoComplete={"email"} mode={"outlined"}
                                   value={user.password} id={"password"} secureTextEntry={HidePassword}
                                   onChangeText={(text) => handleUserChange("password", text)}
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