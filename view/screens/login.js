import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/backImage.png");
export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
}

const onHandleLogin = () => {
    if (email !== "" && password !== "") {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Login success"))
            .catch((err) => Alert.alert("Login error", err.message));
    }
};

return (
    <View style={styles.container}>
        {/* Background Image */}
        <Image source={backImage} style={styles.backImage} />{/* White Overlay */}
        <View style={styles.whiteSheet} />{/* Title */}
        <Text style={styles.title}>Log In</Text><SafeAreaView style={styles.form}>
            {/* Input Fields */}
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
            />{/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>Log In</Text>
            </TouchableOpacity>{/* Navigation to Signup Screen */}
            <View
                style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                }}
            >
                <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        {/* StatusBar */}
        <StatusBar barStyle="light-content" />
    </View>
);