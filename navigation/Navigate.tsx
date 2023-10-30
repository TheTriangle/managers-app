import React from "react";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../view/components/Login";
import Main from "../view/components/Main";

const commonOptions = {
    headerShown: false,
}

const loginOptions = {
    ...commonOptions,
}

const mainOptions = {
    ...commonOptions,
}

type RootStackParamList = {
    Main: undefined;
    Login: undefined;
}

const MainStack = createStackNavigator<RootStackParamList>()

export default function Navigate() {
    return <NavigationContainer>
        <MainStack.Navigator>
            <MainStack.Screen name="Login" component={Login} options={loginOptions}/>
            <MainStack.Screen name="Main" component={Main} options={mainOptions}/>
        </MainStack.Navigator>
    </NavigationContainer>
}
