import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import { auth, db, doc, getDoc, getDocs, onSnapshot, collection, query, where } from '../../data/api/firebase'
import { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import CharityModel from '../../data/model/CharityModel';

export default function CharityAccessList(): JSX.Element {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [charities, setCharities] = useState<CharityModel[]>([]); // Initial empty array of users

    useEffect(() => {
        (async () => {
            const charitiesRef = collection(db, "charities");

            const someDocRef = doc(db, "charities", "016z1i7yP9FcgK6KXZtUmETaHNUS")
            const docSnap = await getDoc(someDocRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            }

            const myOrgsQuery = query(charitiesRef, where("creatorid", "==", auth.currentUser?.uid));
            console.log("start query");
            const querySnapshot = (await getDocs(myOrgsQuery)) as QuerySnapshot;

            console.log("query in progress for user" + auth.currentUser?.uid + " " + querySnapshot.size);
            const charities: CharityModel[] = [];
            querySnapshot.forEach(documentSnapshot => {
                console.log("got charity: " + documentSnapshot.id)
                charities.push(
                    new CharityModel(documentSnapshot.data().name, documentSnapshot.id, documentSnapshot.data().description,
                        documentSnapshot.data().photourl, documentSnapshot.data().paymenturl)
                );
            });
            console.log('charities: ' + charities)
            setLoading(false);
            setCharities(charities);
        })();
        return () => { };
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <FlatList
            data={charities}
            renderItem={({ item }) => (
                <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Charity ID: {item.firestoreId}</Text>
                    <Text>Charity Name: {item.name}</Text>
                </View>
            )}
        />
    );
}