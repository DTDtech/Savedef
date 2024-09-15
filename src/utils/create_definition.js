import { doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";

const addDefinition = async (dbInstance, key, definition, userId) => {
    try {
        const docRef = doc(dbInstance, 'users', userId);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && (docSnap.data().key !== null)) {
            await updateDoc(docRef, {
                [key]: arrayUnion(definition)
            })
        }
        else {
            await setDoc(docRef, {
                [key]: arrayUnion(definition)
            })
        }
    }
    catch (e) {
        throw new Error("Can't add definition: " + e);
    }
}

export default addDefinition;