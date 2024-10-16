const getDefinitions = async (searchKey) => {
    try {
        //set selected text in chrome local storage and open add definition page
        const userInfo = await chrome.storage.local.get("userInfo");
        const uid = userInfo["userInfo"].uid;
        const dictionary = await chrome.storage.local.get(uid);
        if (typeof dictionary[uid] === "undefined") {
            return [];
        }
        else if (typeof dictionary[uid][searchKey.toLowerCase()] === "undefined") {
            return [];
        }
        else {
            console.log(dictionary[uid]);
            console.log(dictionary[uid][searchKey.toLowerCase()]);
            return dictionary[uid][searchKey.toLowerCase()];
        }
        
    }
    catch (e) {
        throw new Error("Can't get definition: " + e);
    }
}

export default getDefinitions;