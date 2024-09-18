import { doc, getDoc } from "firebase/firestore";

const getDictionary = async (dbInstance, userId) => {
    try {
        const docRef = doc(dbInstance, 'users', userId);
        const getDictionaryResult = await getDoc(docRef);
        return getDictionaryResult;
    }
    catch (e) {
        throw new Error("Can't get user's keys: " + e);
    }
}

export default getDictionary;