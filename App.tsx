import React, {useEffect} from "react";
import MainStack from "./navigation/Navigate"
import {useNetInfo} from "@react-native-community/netinfo";
import {getLocalData, storeData} from "./data/repository/local";
import {auth} from "./data/api/firebase";
import {storeCloudData} from "./data/repository/remote";

export default function App() {

  const netInfo = useNetInfo()

  const syncData = async () => {
    const data = await getLocalData()
    if (auth.currentUser?.uid === data!.uid) {
      storeCloudData({})
    }
  }

  useEffect(() => {
    syncData()
  }, [netInfo.isConnected]);

  return (
        <MainStack />
  );
}
