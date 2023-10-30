import {auth, db, doc, setDoc, getDoc, deleteDoc} from "../api/firebase"

const getCloudData = async () => {
    try {
        const docRef = doc(db, "users", auth.currentUser?.uid!)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            console.log("No such document!")
        }
    } catch (e) {
        console.log(e)
    }
}

const wipeData = async () => {
    try {
        const docRef = doc(db, "users", auth.currentUser?.uid!)
        deleteDoc(docRef)
    } catch (e) {
        console.log(e)
    }
}

const storeCloudData = async (value: {}) => {
    try {
        const docref = await setDoc(doc(db, "users", auth.currentUser?.uid!), value)
    } catch (e) {
        console.log(e)
    }
}

export {storeCloudData, getCloudData, wipeData}