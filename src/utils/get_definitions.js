import { doc, getDoc } from "firebase/firestore";

const getDefinitions = async (dbInstance, userId) => {
    let queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    try {
        const selectionResultArr = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => getSelection().toString().trim()
        })
        //set selected text in chrome local storage and open add definition page
        const keyterm = selectionResultArr[0].result;
        const docRef = doc(dbInstance, 'users', userId);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log(Object.keys(result.data()).toLowerCase().keyterm.toLowerCase());
            const lowerCaseKeyResult = Object.fromEntries(
                Object.entries(docSnap.data()).map(([k, v]) => [k.toLowerCase(), v])
            );
            const lowerCaseKeyterm = keyterm.toLowerCase();
            const definitions = lowerCaseKeyResult[lowerCaseKeyterm];
            return definitions;
        }
        else {
            console.log("don't exist");
        }
    }
    catch (e) {
        throw new Error("Can't get definition: " + e);
    }
}

export default getDefinitions;