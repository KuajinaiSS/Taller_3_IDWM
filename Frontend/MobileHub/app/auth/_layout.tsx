import {router, Slot} from "expo-router";
import {Appbar} from "react-native-paper";

const handleBack = () => {
    router.back();
    console.log("Back");
}

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

const style = {
    appbar: {
        margin: 0,
        backgroundColor: '#fcaf43',
    },
};

export default AuthLayout;
