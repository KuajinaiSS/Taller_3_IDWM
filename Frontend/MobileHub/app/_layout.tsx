import {SafeAreaProvider} from "react-native-safe-area-context";
import {PaperProvider, MD3LightTheme as Theme, Appbar} from "react-native-paper";
import {Slot} from "expo-router";

const HomeLayout = () => {
    return (

        <PaperProvider theme={theme}>
            <SafeAreaProvider>

                <Slot/>

            </SafeAreaProvider>
        </PaperProvider>
    );
}

const theme = {
    ...Theme,
    colors: {
        ...Theme.colors,
        primary: '#fcaf43',
        accent: '#fcaf43',
    },
};

export default HomeLayout;