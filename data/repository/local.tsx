import AsyncStorage from "@react-native-async-storage/async-storage";

const getLocalData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("data")
        return jsonValue != null ? JSON.parse(jsonValue) as {
            uid: string
        } : {comments: [], lists: [], uid: ""}
    } catch (e) {
        console.log(e)
    }
}

const wipeLocalData = async () => {
    try {
    } catch (e) {
        console.log(e)
    }
}

const storeData = async (value: { uid: string, }) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem("data", jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export {storeData, getLocalData, wipeLocalData}