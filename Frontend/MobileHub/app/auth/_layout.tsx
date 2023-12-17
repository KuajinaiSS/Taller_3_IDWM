import {router, Slot} from "expo-router";
import {Appbar} from "react-native-paper";
/**
 * retornamos a la pantalla anterior al presionar el botón de retroceso
 */
const handleBack = () => {
    router.back();
    console.log("Back");
}

/**
 * Layout de autenticación (login, register, etc)
 * @constructor
 */
const AuthLayout = () => {
    return (
        <>
            <Appbar.Header style={style.appbar}>
                <Appbar.BackAction onPress={handleBack} />
            </Appbar.Header>
            <Slot/>
        </>
    );
};

/**
 * Estilos 
 */
const style = {
    appbar: {
        margin: 0,
        backgroundColor: '#fcaf43',
    },
};

export default AuthLayout;
