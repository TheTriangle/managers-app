import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth, logout} from "../../data/api/firebase";
import CharityAccessList from "../screens/CharityAccessList";

const handleLogout= () => {
    logout();
}

export default function Main(): JSX.Element {
    return <SafeAreaView>
        <TouchableOpacity style={styles.buttonLoginContainer} onPress={() => handleLogout()}>
            <Text style={{fontWeight: "bold", color: 'white', fontSize: 18}}>Log Out</Text>
        </TouchableOpacity>
        <CharityAccessList />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        width: "80%",
        margin: 4,
    },
    buttonLoginContainer: {
        backgroundColor: '#ff6600',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '60%',
        alignItems: 'center',
    },
    buttonRegContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        width: '60%',
        alignItems: 'center',
    }
})