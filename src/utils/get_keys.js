import { doc, getDoc } from "firebase/firestore";

const getKey = async (dbInstance, userId) => {
    try {
        const docRef = doc(dbInstance, 'users', userId);
        const getKeysResult = await getDoc(docRef);
        return getKeysResult;
    }
    catch (e) {
        throw new Error("Can't get user's keys: " + e);
    }
}

export default getKey;