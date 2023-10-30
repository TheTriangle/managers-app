import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import { auth, db, doc, getDocs, onSnapshot, collection, query, where  } from '../../data/api/firebase'
import { DocumentSnapshot } from 'firebase/firestore';
import CharityModel from '../../data/model/CharityModel';

function Charities() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [charities, setCharities] = useState<CharityModel[]>([]); // Initial empty array of users
  
  useEffect(() => {
    const subscriber = () => {
        const citiesRef = collection(db, "charities");
        
        const myOrgsQuery = query(citiesRef, where("ownerid", "==", auth.currentUser?.uid));
        getDocs(myOrgsQuery).then(querySnapshot => {
            const charities: CharityModel[] = [];
            querySnapshot.forEach(documentSnapshot => {
                charities.push(
                    new CharityModel(documentSnapshot.data().name, documentSnapshot.id, documentSnapshot.data().description, 
                                     documentSnapshot.data().photourl, documentSnapshot.data().paymenturl)
                );
            })
            setLoading(false);
            setCharities(charities);
        });
    }
    return () => subscriber();
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