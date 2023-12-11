import {ActivityIndicator, Button, Card, Text} from 'react-native-paper';
import {ScrollView, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {Repository} from "../../models/Repository";
import axios from "axios";

const HomeScreen = () => {

    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const url = "http://192.168.4.43:5148/Repositories"; // donde se levanto el Backend con /<controlador>

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
                console.log("FINALLY");
            });
    }, []);

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
        <SafeAreaView style={styles.container}>
            <Text variant={"displaySmall"}>Repositorios</Text>

            <ScrollView style={styles.scrollView}>
                {repositories.map((repository) => {
                    return (
                        <Card style={styles.card} key={repository.name}>
                            <Card.Title title={repository.name} titleVariant={"headlineSmall"}/>

                            <Card.Content>
                                <Text variant={"bodySmall"}>Creado el: {repository.createdAt.split("T")[0]}</Text>
                                <Text variant={"bodySmall"}>Actualizado el: {repository.updateAt.split("T")[0]}</Text>
                                <Text variant={"bodySmall"}>Commits: {repository.commitsAmount}</Text>
                            </Card.Content>

                            <Card.Actions>
                                <Button mode={"contained"} onPress={() => console.log("Mas detalles " + repository.name)}>
                                    <Text variant={"bodySmall"}> Ver detalles</Text>
                                </Button>
                            </Card.Actions>
                        </Card>
                    );
                })}
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
        marginTop: 10,
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
    }
});
export default HomeScreen;