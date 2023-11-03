import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { auth, db, doc, getDoc, getDocs, onSnapshot, collection, query, where } from '../../data/api/firebase'
import { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import CharityModel from '../../data/model/CharityModel';

export default function CharityAccessList(): JSX.Element {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [charities, setCharities] = useState<CharityModel[]>([]); // Initial empty array of users

    useEffect(() => {
        (async () => {
            const charitiesRef = collection(db, "charities");

            const myOrgsQuery = query(charitiesRef, where("creatorid", "==", auth.currentUser?.uid));
            const querySnapshot = (await getDocs(myOrgsQuery)) as QuerySnapshot;

            const charities: CharityModel[] = [];
            querySnapshot.forEach(documentSnapshot => {
                charities.push(
                    new CharityModel(documentSnapshot.data().name, documentSnapshot.id, documentSnapshot.data().description,
                        documentSnapshot.data().photourl, documentSnapshot.data().paymenturl)
                );
            });
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
                <TouchableOpacity>
                    <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Charity ID: {item.firestoreId}</Text>
                        <Text>Charity Name: {item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}