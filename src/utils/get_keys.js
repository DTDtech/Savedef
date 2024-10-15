const getKeys = async () => {
    const userInfo = await chrome.storage.local.get("userInfo");
    const uid = userInfo["userInfo"].uid;
    const dictionary = await chrome.storage.local.get(uid);
    console.log(dictionary);
    if (Object.keys(dictionary).length !== 0 && dictionary[uid] !== undefined) {
        return Object.keys(dictionary[uid]);
    }    
    else {
        return {};
    }
}

export default getKeys;