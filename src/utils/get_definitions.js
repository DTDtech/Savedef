const getDefinitions = async (searchKey) => {
    try {
        //set selected text in chrome local storage and open add definition page
        const userInfo = await chrome.storage.local.get("userInfo");
        const userEmail = userInfo["userInfo"].userEmail;
        const dictionary = await chrome.storage.local.get(userEmail);
        if (!dictionary.hasOwnProperty(userEmail)) {
            return [];
        }
        else if (!dictionary[userEmail].hasOwnProperty(searchKey.toLowerCase())) {
            return [];
        }
        else {
            return dictionary[userEmail][searchKey.toLowerCase()];
        }
    }
    catch (e) {
        throw new Error("Can't get definition: " + e);
    }
}

export default getDefinitions;